import React from "react";
import Title from "components/Title";
import { Container, Row, Col } from "react-bootstrap";

export default function Titles({ handleSort }) {
  return (
    <Container fluid className="title">
      <Row>
        <Col md={1} className="col--small"></Col>
        <Col>
          <Title name="title" hasSort={true} handleSort={handleSort} />
        </Col>
        <Col md={1} className="col--extra--medium">
          <Title name="status" hasSort={false} handleSort={handleSort} />
        </Col>
        <Col>
          <Title name="deadline" hasSort={true} handleSort={handleSort} />
        </Col>
        <Col md={1} className="col--extra--medium">
          <Title name="priority" hasSort={true} handleSort={handleSort} />
        </Col>
        <Col md={1} className="col--medium"></Col>
      </Row>
    </Container>
  );
}
