import React from "react";
import { Form } from "react-bootstrap";
import _ from "lodash";

export default function Checkbox({ task, handleChangeStatus, filter }) {
  const checked = _.get(task, "status") === "done" ? true : false;
  const handleChange = (e) => {
    handleChangeStatus(e.target.value, task);
  };
  const handleFilter = (e) => {
    handleChangeStatus(e.target.checked);
  };

  return (
    <Form.Check
      checked={filter ? filter : checked}
      disabled={checked}
      value={"done"}
      onChange={filter ? handleFilter : handleChange}
    />
  );
}
