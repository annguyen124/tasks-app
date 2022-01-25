import React from "react";
import Dropdown from "components/Dropdown";
import Button from "components/Button";
import { Stack } from "react-bootstrap";

export default function Actions({
  handleChangeView,
  handleChangeStatus,
  view,
  status,
  handleShow,
}) {
 
  return (
    <Stack direction="horizontal" gap={2} className="action">
      <Dropdown
        name={view}
        options={["Show incompleted tasks", "Show completed tasks", "Show all"]}
        handleChange={handleChangeView}
      />
      <Dropdown
        name={status}
        options={["Not Started", "Pending", "In Progress", "Delay", "Done"]}
        handleChange={handleChangeStatus}
      />
      <Button
        handleClick={handleShow}
        className="btn-add"
        name="New Task"
      ></Button>
    </Stack>
  );
}
