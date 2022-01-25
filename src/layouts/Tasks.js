import React from "react";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import Checkbox from "components/Checkbox";
import DropdownButton from "components/DropdownButton";
export default function Task(props) {
  const { tasks, handleShow } = props;
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Edit/Delete
    </Tooltip>
  );
  return tasks.map((task) => (
    <Container fluid key={task.id} className="task">
      <Row className="task__item">
        <Col md={1} className="col--small">
          <Checkbox />
        </Col>
        <Col>
          <p>{task.title}</p>
          <p className="task-desc">{task.description}</p>
        </Col>
        <Col md={1} className="col--extra--medium">
          {/* <div className="not-started">{task.status}</div> */}
          <DropdownButton status={task.status} />
        </Col>
        <Col>{task.deadline} </Col>
        <Col md={1} className="col--extra--medium">
          <div className="priority">{task.priority}</div>
        </Col>
        <Col md={1} className="col--medium col--action" >
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 100, hide: 0 }}
            overlay={renderTooltip}
          >
            <i className="bi bi-pencil" onClick={() => handleShow(task)}></i>
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 100, hide: 0 }}
            overlay={renderTooltip}
          >
            <i className="bi bi-trash"></i>
          </OverlayTrigger>
        </Col>
      </Row>
    </Container>
  ));
}
