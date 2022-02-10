import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function ConfirmDialog(props) {
  const { show, handleClose, task, handleDeleteTask } = props;

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>{task.title}</strong> will be deleted permanently. Are you
          sure you really want to do this?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteTask}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
