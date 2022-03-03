import React from "react";
import DropdownButton from "components/DropdownButton";
import Button from "components/Button";
import Checkbox from "components/Checkbox";
import { Stack } from "react-bootstrap";
import { SORT } from "constants";

export default function Actions({
  filterIncompletedTasks,
  fitlerByStatus,
  status,
  handleShow,
  showIncompletedTasks,
  handleSort,
  sort,
}) {
  return (
    <div className="action">
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
      <DropdownButton value={sort.name} sort={SORT} handleChange={handleSort} />
      <Button handleClick={handleShow} name="New Task"></Button>
    </div>
  );
}
