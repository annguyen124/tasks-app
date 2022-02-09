import React from "react";
import { Stack } from "react-bootstrap";
import { TASKS } from "constants";

export default function Title(props) {
  const { name, hasSort, handleSort } = props;
  return (
    <Stack direction="horizontal">
      <h2>{name}</h2>
      {hasSort ? (
        <i
          className="bi bi-sort-down ms-auto"
          onClick={() => handleSort(name)}
        ></i>
      ) : null}
    </Stack>
  );
}
