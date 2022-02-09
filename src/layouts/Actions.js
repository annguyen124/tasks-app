import React from "react";
import Dropdown from "components/Dropdown";
import Button from "components/Button";
import Checkbox from "components/Checkbox";
import { Stack } from "react-bootstrap";
import { STATUSES } from "constants";
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
      />
      Show incompleted tasks only
      <Dropdown
        name={status}
        options={["status", ...STATUSES]}
        handleChange={fitlerByStatus}
        showIncompletedTasks={showIncompletedTasks}
      />
      <Button
        handleClick={handleShow}
        className="btn-add"
        name="New Task"
      ></Button>
    </Stack>
  );
}
