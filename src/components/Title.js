import React from "react";
import { Stack } from "react-bootstrap";
import _ from "lodash";

export default function Title(props) {
  const { name, sort, handleSort } = props;
  const asc = _.get(sort, "type") && name === _.get(sort, "name");
  const desc = !asc && name === _.get(sort, "name");

  const descStyle = `bi ${desc ? "bi-caret-up-fill" : "bi-caret-up"}`;
  const ascStyle = `bi ${asc ? "bi-caret-down-fill" : "bi-caret-down"}`;

  return (
    <Stack direction="horizontal">
      <h2>{name}</h2>
      {sort ? (
        <div className="ms-auto sort" onClick={() => handleSort(name)}>
          <i className={descStyle}></i>
          <i className={ascStyle}></i>
        </div>
      ) : null}
    </Stack>
  );
}
