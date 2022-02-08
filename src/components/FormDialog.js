import React, { useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import Datetime from "react-datetime";
import { STATUSES, PRIORITIES } from "constants";
import _ from "lodash";
import moment from "moment";

export default function FormDialog(props) {
  const {
    dialog,
    show,
    handleClose,
    task,
    handleChangeForm,
    handleSubmitForm,
    handleDateTime,
  } = props;

  const yesterday = moment().subtract(1, "day");
  function validDate(current) {
    return current.isAfter(yesterday);
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{dialog.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitForm} className="form">
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    required
                    name="title"
                    placeholder="Enter title"
                    defaultValue={task.title}
                    onChange={handleChangeForm}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Priority</Form.Label>
                  <Form.Select
                    name="priority"
                    onChange={handleChangeForm}
                    defaultValue={task.priority}
                  >
                    {PRIORITIES.map((priority, index) => (
                      <option key={index}>{priority}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  rows={3}
                  placeholder="Tell me more about the task"
                  defaultValue={task.description}
                  onChange={handleChangeForm}
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
                      isValidDate={validDate}
                      dateFormat="MMM DD, YYYY"
                      initialValue={new Date(task.deadline)}
                      onChange={handleDateTime}
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    onChange={handleChangeForm}
                    defaultValue={task.status}
                  >
                    {STATUSES.map((status, index) => (
                      <option key={index}>{status}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="form__actions">
              <Col md={{ offset: 6 }}>
                <Button variant="outline-secondary" onClick={handleClose}>
                  Close
                </Button>
              </Col>
              <Col>
                <Button type="submit" variant="primary">
                  {dialog.action}
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
