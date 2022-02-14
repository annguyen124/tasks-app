import React from "react";
import DropdownButton from "components/DropdownButton";
import Button from "components/Button";
import Checkbox from "components/Checkbox";
import { Stack } from "react-bootstrap";

export default function Actions({
  filterIncompletedTasks,
  fitlerByStatus,
  status,
  handleShow,
  showIncompletedTasks,
}) {
  return (
    <Stack direction="horizontal" gap={2} className="action">
      <Checkbox
        handleChangeStatus={filterIncompletedTasks}
        filter={showIncompletedTasks}
        status={status}
      />
      <p className={status === "done" ? "inactive" : ""}>
        Show incompleted tasks only
      </p>
      <DropdownButton
        value={status}
        handleChange={fitlerByStatus}
        showIncompletedTasks={showIncompletedTasks}
      />
      <Button
        handleClick={handleShow}
        name="New Task"
      ></Button>
    </Stack>
  );
}
