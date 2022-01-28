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
import { TASKS } from "constants";
import _ from "lodash";
import ConfirmDialog from "components/ConfirmDialog";

const INITIAL_TASK = {
  title: "",
  description: "",
  deadline: "",
  status: "Not Started",
  priority: "Medium",
};

export default function TaskList(params) {
  const [tasks, setTasks] = useState(TASKS);
  const [view, setView] = useState("Show incomplete tasks");
  const [status, setStatus] = useState("Not Started");
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [task, setTask] = useState(INITIAL_TASK);
  const [dialog, setDialog] = useState({});

  useEffect(() => {}, []);

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

  const handleChangeView = (newView) => {
    setView(newView);
  };

  const handleChangeStatus = (newStatus) => {
    setStatus(newStatus);
  };

  const handleChangeForm = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  const handleDateTime = (m) => {
    setTask({ ...task, deadline: m.format("hh:mm A, MMM DD, YYYY") });
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (_.get(task, "id")) {
      setTasks(
        tasks.map((curTask) => (curTask.id === task.id ? task : curTask))
      );
    } else {
      const newTask = { id: tasks.length + 1, ...task };
      setTasks([newTask, ...tasks]);
    }
    setShow(false);
  };

  const handleShowConfirm = (curTask = {}) => {
    setShowConfirm(true);
    setTask(curTask);
  };
  const handleCloseConfirm = () => setShowConfirm(false);

  const handleDeleteTask = () => {
    setShowConfirm(false);
    setTasks(tasks.filter((curTask) => curTask.id !== task.id));
  };

  const handleCheckDoneTask = (checked, task) => {
    task.status = checked;
    setTasks(tasks.map((curTask) => (curTask.id === task.id ? task : curTask)));
  };

  return (
    <Container className="container">
      <h1>Tasks</h1>
      <Actions
        handleChangeView={handleChangeView}
        handleChangeStatus={handleChangeStatus}
        view={view}
        status={status}
        handleShow={handleShow}
      />
      <Titles />
      <Tasks
        tasks={tasks}
        handleShow={handleShow}
        handleShowConfirm={handleShowConfirm}
        handleCheckDoneTask={handleCheckDoneTask}
      />
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
