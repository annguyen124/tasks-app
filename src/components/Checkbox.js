import React from "react";
import { Form } from "react-bootstrap";
import _ from "lodash";
import * as constants from "../constants";

export default function Checkbox({ task, handleChangeStatus, filter }) {
  const checked = _.get(task, "status") === constants.DONE ? true : false;
  const handleChange = (e) => {
    handleChangeStatus(e.target.value, task);
  };

  const handleFilter = (e) => {
    handleChangeStatus(e.target.checked);
  };

  return (
    <Form.Check
      checked={filter || checked}
      value={checked ? _.get(task, "prev_status") : "done"}
      onChange={filter ? handleFilter : handleChange}
    />
  );
}
