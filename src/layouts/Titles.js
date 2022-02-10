import React from "react";
import Title from "components/Title";
import { Container, Row, Col } from "react-bootstrap";

export default function Titles({ handleSort, sortName }) {
  return (
    <Container fluid className="title">
      <Row>
        <Col md={1} className="col--small"></Col>
        <Col>
          <Title name="title" sortName={sortName} handleSort={handleSort} />
        </Col>
        <Col md={1} className="col--extra--medium">
          <Title name="status" handleSort={handleSort} />
        </Col>
        <Col>
          <Title name="deadline" sortName={sortName} handleSort={handleSort} />
        </Col>
        <Col md={1} className="col--extra--medium">
          <Title name="priority" sortName={sortName} handleSort={handleSort} />
        </Col>
        <Col md={1} className="col--medium"></Col>
      </Row>
    </Container>
  );
}
