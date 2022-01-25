import React from "react";
import { Stack } from "react-bootstrap";

export default function Title(props) {
  const { name, hasSort } = props;
  //const sortType = hasSort
  return (
    <Stack direction="horizontal">
      <h2>{name}</h2>
      {hasSort ? <i className="bi bi-sort-down ms-auto"></i> : null}
    </Stack>
  );
}
