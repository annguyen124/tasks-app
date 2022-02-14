import React from "react";
import { Form } from "react-bootstrap";
import _ from "lodash";
import * as constants from "../constants";

export default function Checkbox({ task, handleChangeStatus, filter, status }) {
  const checked =
    _.get(task, constants.STATUS) === constants.DONE ? true : false;

  const handleChange = (e) => {
    handleChangeStatus(e.target.value, _.get(task, "id"));
  };
  const handleFilter = (e) => {
    handleChangeStatus(e.target.checked);
  };

  return (
    <Form.Check
      checked={filter ? filter : checked}
      disabled={checked || status === constants.DONE}
      value={constants.DONE}
      onChange={filter ? handleFilter : handleChange}
    />
  );
}
