import * as actionTypes from "services/constants";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";
import _ from "lodash";
import * as constants from "../../constants";

export const getTasks = (status, showIncompletedTasks, sort) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_TASKS,
  });

  const q = query(
    collection(db, "tasks"),
    orderBy(sort.name, sort.type ? "asc" : "desc")
  );
  const unsub = onSnapshot(q, (querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    dispatch({
      type: actionTypes.GET_TASKS_SUCCEED,
      payload: {
        tasks: data.filter((task) =>
          status === constants.STATUS
            ? showIncompletedTasks
              ? task.status !== constants.DONE
              : task
            : task.status === status
        ),
        size: data.length,
      },
    });
  });

  return unsub;
};

export const addTask = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.ADD_TASK,
  });

  try {
    await addDoc(collection(db, "tasks"), {
      ...data,
      created: Timestamp.now(),
    });
    dispatch({
      type: actionTypes.ADD_TASK_SUCCEED,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.ADD_TASK_FAILED,
      payload: err,
    });
  }
};

export const editTask = (id, data) => async (dispatch) => {
  dispatch({
    type: actionTypes.EDIT_TASK,
  });
  const taskDocRef = doc(db, "tasks", id);
  try {
    updateDoc(taskDocRef, { ...data });
    dispatch({
      type: actionTypes.EDIT_TASK_SUCCEED,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.EDIT_TASK_FAILED,
      payload: err,
    });
  }
};

export const deleteTask = (id) => async (dispatch) => {
  dispatch({
    type: actionTypes.DELETE_TASK,
  });
  const taskDocRef = doc(db, "tasks", id);
  try {
    await deleteDoc(taskDocRef);
    dispatch({
      type: actionTypes.DELETE_TASK_SUCCEED,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.DELETE_TASK_FAILED,
      payload: err,
    });
  }
};

export const dndTask = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.DND_TASK,
    payload: data,
  });

  const batch = writeBatch(db);
  data.forEach((task, index) => {
    const sfRef = doc(db, "tasks", task.id);
    batch.update(sfRef, { index: data.length - index });
  });

  await batch.commit();
};
