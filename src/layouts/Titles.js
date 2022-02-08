import React from "react";
import Title from "components/Title";
import { Container, Row, Col } from "react-bootstrap";

export default function Titles() {
  return (
    <Container fluid className="title">
      <Row>
        <Col md={1} className="col--small"></Col>
        <Col>
          <Title name="Title" hasSort={true} />
        </Col>
        <Col md={1} className="col--extra--medium">
          <Title name="Status" hasSort={false} />
        </Col>
        <Col>
          <Title name="Deadline" hasSort={true} />
        </Col>
        <Col md={1} className="col--extra--medium">
          <Title name="Priority" hasSort={true} />
        </Col>
        <Col md={1} className="col--medium"></Col>
      </Row>
    </Container>
  );
}
