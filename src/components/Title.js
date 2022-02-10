import React from "react";
import { Stack } from "react-bootstrap";

export default function Title(props) {
  const { name, sortName, handleSort } = props;
  const sortStyle = `bi bi-sort-down ms-auto ${
    sortName === name ? "active" : ""
  }`;
  return (
    <Stack direction="horizontal">
      <h2>{name}</h2>
      {sortName ? (
        <i className={sortStyle} onClick={() => handleSort(name)}></i>
      ) : null}
    </Stack>
  );
}
