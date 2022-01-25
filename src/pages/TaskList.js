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
  const [task, setTask] = useState(INITIAL_TASK);
  const [action, setAction] = useState("Edit");

  const handleAddTask = () => {
    
  };

  const handleEditTask = () => {
  };

  const [handleAction, setHandleAction] = useState(handleEditTask);

  const handleClose = () => setShow(false);

  const handleShow = (curTask = {}) => {
    const isAdd = _.isEmpty(curTask);
    setAction(isAdd ? "Add" : "Edit");
    setHandleAction(isAdd ? handleAddTask : handleEditTask);
    setTask(isAdd ? INITIAL_TASK : curTask);
    setShow(true);
  };

  const handleChangeView = (newView) => {
    setView(newView);
  };
  const handleChangeStatus = (newStatus) => {
    setStatus(newStatus);
  };
  const handleChangePriority = (newPriority) => {};
  
  useEffect(() => {}, [view, status, tasks]);
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
      <Tasks tasks={tasks} handleShow={handleShow} />
      <FormDialog
        show={show}
        handleClose={handleClose}
        action={action}
        handleAction={handleAction}
        task={task}
        handleChangeStatus={handleChangeStatus}
        handleChangePriority={handleChangePriority}
      />
    </Container>
  );
}
