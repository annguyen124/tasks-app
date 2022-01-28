import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { STATUSES } from "constants";
export default function MyDropdownButton({ task, status, handleChangeStatus }) {
  return (
    <DropdownButton id="dropdown-basic-button" title={status}>
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
