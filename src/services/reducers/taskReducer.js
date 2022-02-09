import * as actionTypes from "services/constants";

const initialState = { data: [], status: null };

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_TASKS:
      return { ...state };

    case actionTypes.GET_TASKS_SUCCEED:
      return {
        ...state,
        data: payload,
      };

    case actionTypes.GET_TASKS_FAILED:
      return { ...state };

    case actionTypes.ADD_TASK:
      return { ...state };

    case actionTypes.ADD_TASK_SUCCEED:
      return {
        ...state,
        status: payload.status,
      };

    case actionTypes.ADD_TASK_FAILED:
      return { ...state, status: payload.status };

    case actionTypes.EDIT_TASK:
      return { ...state };

    case actionTypes.EDIT_TASK_SUCCEED:
      return {
        ...state,
        status: payload.status,
      };

    case actionTypes.EDIT_TASK_FAILED:
      return { ...state, status: payload.status };

    case actionTypes.DELETE_TASK:
      return { ...state };

    case actionTypes.DELETE_TASK_SUCCEED:
      return { ...state, status: payload.status };

    case actionTypes.DELETE_TASK_FAILED:
      return { ...state, status: payload.status };

    case actionTypes.DND_TASK:
      return { ...state, data: payload };
    default:
      return state;
  }
}
