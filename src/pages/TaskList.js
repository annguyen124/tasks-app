import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import moment from "moment";

import Actions from "layouts/Actions";
import Tasks from "layouts/Tasks";
import Titles from "layouts/Titles";
import FormDialog from "layouts/FormDialog";
import ConfirmDialog from "layouts/ConfirmDialog";
import EmptyList from "layouts/EmptyList";
import Notification from "components/Notification";

import { Container } from "react-bootstrap";
import "react-datetime/css/react-datetime.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "assets/styles/style.css";

import {
  getTasks,
  addTask,
  editTask,
  deleteTask,
  dndTask,
} from "services/actions";

const INITIAL_TASK = {
  title: "",
  description: "",
  deadline: "",
  status: "not started",
  priority: "1",
};

const DEFAULT_SORT = {
  name: "index",
  type: false,
};

export default function TaskList() {
  const dispatch = useDispatch();
  const { tasks, size } = useSelector((state) => state.tasks);

  const [showIncompletedTasks, setShowIncompletedTasks] = useState(true);
  const [status, setStatus] = useState("all");
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [task, setTask] = useState(INITIAL_TASK);
  const [dialog, setDialog] = useState({});
  const [sort, setSort] = useState(DEFAULT_SORT);
  const [notification, setNotification] = useState({
    show: false,
    title: "",
    content: "",
    variant: "",
  });

  useEffect(() => {
    const unsub = dispatch(getTasks(status, showIncompletedTasks, sort));
    return () => unsub();
  }, [status, showIncompletedTasks, sort]);

  const filterIncompletedTasks = (toggleShow) => {
    setShowIncompletedTasks(toggleShow);
  };

  const fitlerByStatus = (newStatus) => {
    if (newStatus === "done") setShowIncompletedTasks(false);
    setStatus(newStatus);
  };

  const handleSort = (name) => {
    if (name !== sort.name) setSort({ name, type: true });
    else {
      setSort({ name: sort.type ? name : DEFAULT_SORT.name, type: false });
    }
  };

  const handleShow = (curTask = {}) => {
    const isAdd = _.isEmpty(curTask);
    setTask(isAdd ? INITIAL_TASK : curTask);
    setDialog({
      title: isAdd ? "Add Task" : "Edit Task",
      action: isAdd ? "Add" : "Edit",
    });
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleChangeForm = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleDateTime = (m) => {
    setTask({ ...task, deadline: m.format("MMMM DD, YYYY, hh:mm A") });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const id = _.get(task, "id");
    const isRequired = _.get(task, "title") && _.get(task, "deadline");
    if (isRequired) {
      if (id) {
        dispatch(editTask(id, task));
      } else {
        const index = _.isEmpty(tasks)
          ? 1
          : Math.max(...tasks.map((task) => _.get(task, "index"))) + 1;
        dispatch(
          addTask({ index, prev_status: _.get(task, "status"), ...task })
        );
      }
      setShow(false);
    } else {
      console.log("PLEASE FILL IN FORM");
      setNotification({
        show: true,
        variant: "warning",
        title: "Warning",
        content: "Title and Deadline are required!",
      });
    }
  };

  const handleChangeStatus = async (newStatus, task) => {
    const isExpired =
      moment() > moment(task.deadline, "MMMM DD, YYYY, hh:mm A");
    const notDone = newStatus !== "done";
    dispatch(
      editTask(_.get(task, "id"), {
        status: isExpired && notDone ? "delay" : newStatus,
        prev_status: _.get(task, "status"),
      })
    );
  };

  const handleShowConfirm = (curTask = {}) => {
    setShowConfirm(true);
    setTask(curTask);
  };

  const handleCloseConfirm = () => setShowConfirm(false);

  const handleDeleteTask = async () => {
    dispatch(deleteTask(_.get(task, "id")));
    setShowConfirm(false);
  };

  const handleDnD = (orderedTasks) => {
    setSort(DEFAULT_SORT);
    dispatch(dndTask(orderedTasks));
  };

  return (
    <Container className="container">
      <h1>Todos</h1>
      <Actions
        filterIncompletedTasks={filterIncompletedTasks}
        fitlerByStatus={fitlerByStatus}
        status={status}
        handleShow={handleShow}
        showIncompletedTasks={showIncompletedTasks}
        handleSort={handleSort}
        sort={sort}
      />

      <div className="task__table">
        {_.isEmpty(tasks) ? (
          <EmptyList
            handleShow={handleShow}
            initial={status === "all" && !showIncompletedTasks}
          />
        ) : (
          <>
            <Titles handleSort={handleSort} sort={sort} tasks={tasks} />
            <Tasks
              tasks={tasks}
              handleShow={handleShow}
              handleShowConfirm={handleShowConfirm}
              handleChangeStatus={handleChangeStatus}
              handleDnD={handleDnD}
            />
            <div className="footer">
              Show {tasks.length} out of {size}
            </div>
          </>
        )}
      </div>
      <FormDialog
        show={show}
        handleClose={handleClose}
        dialog={dialog}
        task={task}
        handleSubmitForm={handleSubmitForm}
        handleChangeForm={handleChangeForm}
        handleDateTime={handleDateTime}
      />
      <ConfirmDialog
        show={showConfirm}
        handleClose={handleCloseConfirm}
        handleDeleteTask={handleDeleteTask}
        task={task}
      ></ConfirmDialog>
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
    </Container>
  );
}
