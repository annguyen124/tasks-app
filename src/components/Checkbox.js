import React from "react";
import { Form } from "react-bootstrap";
import _ from "lodash";

export default function Checkbox({ task, handleCheckDoneTask }) {
  const checked = _.get(task, "status") === "Done" ? true : false;
  const handleChange = (e) => {
    console.log(e.target.checked);
    handleCheckDoneTask(e.target.value, task);
  };

  return (
    <Form.Check
      aria-label="radio 1"
      checked={checked}
      disabled={checked}
      value={"Done"}
      onChange={handleChange}
    />
  );
}
