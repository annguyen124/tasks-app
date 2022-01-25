import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

export default function MyDropdownButton({ status }) {
  return (
    <DropdownButton
    //   variant={
    //     status === "Not Started"
    //       ? "secondary "
    //       : status === "Pending"
    //       ? "warning"
    //       : status === "In Progress"
    //       ? "success"
    //       : status === "Delay"
    //       ? "danger"
    //       : "primary"
    //   }
      id="dropdown-basic-button"
      title={status}
     
    >
      <Dropdown.Item href="#/action-1">Not Started</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Pending</Dropdown.Item>
      <Dropdown.Item href="#/action-3">In Progress</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Delay</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Done</Dropdown.Item>
    </DropdownButton>
  );
}
