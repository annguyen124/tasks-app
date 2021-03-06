import React, { useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import Datetime from "react-datetime";
import * as constants from "../constants";
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
  const [disabled, setDisabled] = useState(false);
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
                    name="title"
                    placeholder="Enter title"
                    defaultValue={_.get(task, "title")}
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
                    defaultValue={_.get(task, "priority")}
                  >
                    {constants.PRIORITIES.map((priority, index) => (
                      <option key={index} value={index}>
                        {priority}
                      </option>
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
                  defaultValue={_.get(task, "description")}
                  onChange={handleChangeForm}
                />
              </Form.Group>
            </Row>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Deadline</Form.Label>
                  <div className="form__calendar">
                    <i className="bi bi-calendar"></i>
                    <Datetime
                      inputProps={{
                        placeholder: "Select date & time",
                        disabled: disabled,
                      }}
                      isValidDate={validDate}
                      onOpen={() => setDisabled(true)}
                      onClose={() => setDisabled(false)}
                      dateFormat="MMM DD, YYYY"
                      initialValue={new Date(_.get(task, "deadline"))}
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
                    defaultValue={_.get(task, "status")}
                  >
                    {constants.STATUSES.map((status, index) => (
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
