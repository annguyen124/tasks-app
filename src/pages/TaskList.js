import React, { useState, useEffect } from "react";
import Actions from "layouts/Actions";
import Tasks from "layouts/Tasks";
import Titles from "layouts/Titles";
import { Container } from "react-bootstrap";
import "react-datetime/css/react-datetime.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "assets/styles/style.css";
import FormDialog from "components/FormDialog";
import _ from "lodash";
import ConfirmDialog from "components/ConfirmDialog";
import { useDispatch, useSelector } from "react-redux";
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
  priority: "medium",
};

export default function TaskList(params) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.data);
  const [showIncompletedTasks, setShowIncompletedTasks] = useState(false);
  const [status, setStatus] = useState("status");
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [task, setTask] = useState(INITIAL_TASK);
  const [dialog, setDialog] = useState({});
  const [sort, setSort] = useState({ name: "index", type: false });
  useEffect(() => {
    const unsub = dispatch(getTasks(status, showIncompletedTasks, sort));
    return () => unsub();
  }, [status, showIncompletedTasks, sort]);

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

  const filterIncompletedTasks = (toggleShow) => {
    setShowIncompletedTasks(toggleShow);
  };

  const fitlerByStatus = (newStatus) => {
    if (newStatus === "done") setShowIncompletedTasks(false);
    setStatus(newStatus);
  };

  const handleChangeForm = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  const handleDateTime = (m) => {
    setTask({ ...task, deadline: m.format("hh:mm A, MMM DD, YYYY") });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const id = _.get(task, "id");
    if (id) {
      dispatch(editTask(id, task));
    } else {
      const index = _.isEmpty(tasks)
        ? 1
        : Math.max(...tasks.map((task) => task.index)) + 1;
      dispatch(addTask({ index, ...task }));
    }

    setShow(false);
  };

  const handleShowConfirm = (curTask = {}) => {
    setShowConfirm(true);
    setTask(curTask);
  };
  const handleCloseConfirm = () => setShowConfirm(false);

  const handleDeleteTask = async () => {
    dispatch(deleteTask(task.id));
    setShowConfirm(false);
  };

  const handleChangeStatus = async (checked, task) => {
    dispatch(editTask(task.id, { status: checked }));
  };

  const handleDnD = (orderedTasks) => {
    dispatch(dndTask(orderedTasks));
  };

  const handleSort = (name) => {
    if (name !== sort.name) setSort({ name, type: true });
    else setSort({ name, type: !sort.type });
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
      />
      <Titles handleSort={handleSort} />
      {_.isEmpty(tasks) ? (
        <div> There is no tasks to display.</div>
      ) : (
        <Tasks
          tasks={tasks}
          handleShow={handleShow}
          handleShowConfirm={handleShowConfirm}
          handleChangeStatus={handleChangeStatus}
          handleDnD={handleDnD}
        />
      )}
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
    </Container>
  );
}
