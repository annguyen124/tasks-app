import * as actionTypes from "services/constants";
import _ from "lodash";

const initialState = { tasks: [], size: 0, status: null };

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_TASKS:
      return { ...state };

    case actionTypes.GET_TASKS_SUCCEED:
      return {
        ...state,

        tasks: _.get(payload, "tasks"),
        size: _.get(payload, "size"),
      };

    case actionTypes.GET_TASKS_FAILED:
      return { ...state };

    case actionTypes.ADD_TASK:
      return { ...state };

    case actionTypes.ADD_TASK_SUCCEED:
      return {
        ...state,
        status: payload,
      };

    case actionTypes.ADD_TASK_FAILED:
      return { ...state, status: payload };

    case actionTypes.EDIT_TASK:
      return { ...state };

    case actionTypes.EDIT_TASK_SUCCEED:
      return {
        ...state,
        status: payload,
      };

    case actionTypes.EDIT_TASK_FAILED:
      return { ...state, status: payload };

    case actionTypes.DELETE_TASK:
      return { ...state };

    case actionTypes.DELETE_TASK_SUCCEED:
      return { ...state, status: payload };

    case actionTypes.DELETE_TASK_FAILED:
      return { ...state, status: payload };

    case actionTypes.DND_TASK:
      return { ...state, tasks: payload };
    default:
      return state;
  }
}
