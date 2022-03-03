import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import * as constants from "../constants";
import _ from "lodash";
export default function MyDropdownButton({
  value,
  handleChange,
  task,
  showIncompletedTasks,
  sort = false,
}) {
  const statusType =
    value === constants.NOT_STARTED
      ? "not-started"
      : value === constants.IN_PROGRESS
      ? "in-progress"
      : value;

  const options = sort ? constants.SORT : constants.STATUSES;
  
  return (
    <DropdownButton
      title={value === "index" ? constants.UNSORT : value}
      className={sort ? "dropdown--sort" : statusType}
      variant="outline-success"
    >
      {!_.get(task, "id") ? (
        <Dropdown.Item
          onClick={() => handleChange(sort ? "index" : constants.STATUS)}
        >
          {sort ? constants.UNSORT : constants.STATUS}
        </Dropdown.Item>
      ) : null}

      {options?.map((item, index) => (
        <Dropdown.Item
          key={index}
          active={item === value}
          onClick={() => handleChange(item, task)}
          disabled={item === constants.DONE && showIncompletedTasks}
        >
          {item}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}
