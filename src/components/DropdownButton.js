import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import * as constants from "../constants";

export default function MyDropdownButton({
  value,
  handleChange,
  id,
  showIncompletedTasks,
}) {
  const statusType =
    value === constants.NOT_STARTED
      ? "not-started"
      : value === constants.IN_PROGRESS
      ? "in-progress"
      : value;

  return (
    <DropdownButton
      title={value}
      className={statusType}
      variant="outline-success"
    >
      {!id ? (
        <Dropdown.Item onClick={() => handleChange(constants.STATUS)}>
          {constants.STATUS}
        </Dropdown.Item>
      ) : null}
      {constants.STATUSES.map((status, index) => (
        <Dropdown.Item
          key={index}
          active={status === value}
          onClick={() => handleChange(status, id)}
          disabled={status === constants.DONE && showIncompletedTasks}
        >
          {status}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}
