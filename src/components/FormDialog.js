import React, { useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import Datetime from "react-datetime";
import Dropdown from "./Dropdown";
import { STATUSES, PRIORITIES } from "constants";
export default function FormDialog(props) {
  const {
    title,
    action,
    handleAction,
    show,
    handleClose,
    task,
    handleChangeStatus,
  } = props;

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={9}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter title"
                    defaultValue={task.title}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Priority</Form.Label>
                  <Dropdown
                    name={task.priority}
                    options={PRIORITIES}
                    handleChange={handleChangeStatus}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Tell me more about the task"
                  defaultValue={task.description}
                />
              </Form.Group>
            </Row>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Deadline</Form.Label>
                  <div className="calendar">
                    <i className="bi bi-calendar calendar__icon"></i>
                    <Datetime
                      inputProps={{ placeholder: "Select date & time" }}
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Status</Form.Label>
                  <Dropdown
                    name={task.status}
                    options={STATUSES}
                    handleChange={handleChangeStatus}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAction}>
            {action}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
