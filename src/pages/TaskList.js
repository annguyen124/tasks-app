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

import { db } from "../firebase";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const INITIAL_TASK = {
  title: "",
  description: "",
  deadline: "",
  status: "not started",
  priority: "medium",
};

export default function TaskList(params) {
  const [tasks, setTasks] = useState([]);
  const [showIncompletedTasks, setShowIncompletedTasks] = useState(false);
  const [status, setStatus] = useState("status");
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [task, setTask] = useState(INITIAL_TASK);
  const [dialog, setDialog] = useState({});
  // const [sort, setSort] = useState({ name: "", type: "" });

  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("created", "desc"));
    const ingore = onSnapshot(q, (querySnapshot) => {
      const list = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

   
      setTasks(
        showIncompletedTasks
          ? list.filter((task) => task.status !== "done")
          : status !== "status"
          ? list.filter((task) => task.status === status)
          : list
      );
    });

    return () => ingore();
  }, [status, showIncompletedTasks]);

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
      const taskDocRef = doc(db, "tasks", id);
      try {
        await updateDoc(taskDocRef, { ...task });
      } catch (err) {
        alert("EDIT", err);
      }
    } else {
      try {
        await addDoc(collection(db, "tasks"), {
          ...task,
          created: Timestamp.now(),
        });
      } catch (err) {
        alert(err);
      }
    }

    setShow(false);
  };

  const handleShowConfirm = (curTask = {}) => {
    setShowConfirm(true);
    setTask(curTask);
  };
  const handleCloseConfirm = () => setShowConfirm(false);

  const handleDeleteTask = async () => {
    setShowConfirm(false);
    const taskDocRef = doc(db, "tasks", task.id);
    try {
      await deleteDoc(taskDocRef);
    } catch (err) {
      alert(err);
    }
  };

  const handleChangeStatus = async (checked, task) => {
    const taskDocRef = doc(db, "tasks", task.id);
    try {
      await updateDoc(taskDocRef, { ...task, status: checked });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Container className="container">
      <h1>Tasks</h1>
      <Actions
        filterIncompletedTasks={filterIncompletedTasks}
        fitlerByStatus={fitlerByStatus}
        status={status}
        handleShow={handleShow}
      />
      <Titles />
      {_.isEmpty(tasks) ? (
        <div> There is no tasks to display.</div>
      ) : (
        <Tasks
          tasks={tasks}
          handleShow={handleShow}
          handleShowConfirm={handleShowConfirm}
          handleChangeStatus={handleChangeStatus}
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
