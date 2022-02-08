import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { STATUSES } from "constants";
export default function MyDropdownButton({ task, handleChangeStatus }) {
  const statusType =
    task.status === "not started"
      ? "not-started"
      : task.status === "in progress"
      ? "in-progress"
      : task.status;

  return (
    <DropdownButton title={task.status} className={statusType}>
      {STATUSES.map((status, index) => (
        <Dropdown.Item
          key={index}
          active={status === task.status}
          onClick={() => handleChangeStatus(status, task)}
        >
          {status}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}
