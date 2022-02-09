import React from "react";
import { Dropdown } from "react-bootstrap";

export default function CustomDropdown(props) {
  const { name, options, handleChange, showIncompletedTasks } = props;

  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
        {name}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {options.map((option, index) => (
          <Dropdown.Item
            key={index}
            onClick={() => handleChange(option)}
            disabled={option === "done" && showIncompletedTasks}
          >
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
