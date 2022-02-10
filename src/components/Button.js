import React from "react";
import { Button } from "react-bootstrap";

export default function CustomButton(props) {
  const { name, handleClick } = props;
  return (
    <Button variant="success" onClick={() => handleClick()}>
      <i className="bi bi-plus"></i>
      {name}
    </Button>
  );
}
