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

  return filter ? (
    <Form.Check defaultChecked={false} onChange={handleFilter} />
  ) : (
    <Form.Check
      checked={checked}
      disabled={checked}
      value={"done"}
      onChange={handleChange}
    />
  );
}
