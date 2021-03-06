import React from "react";
import Title from "components/Title";
import { Container, Row, Col } from "react-bootstrap";
import _ from "lodash";

export default function Titles({ handleSort, sort, tasks, filter }) {
  return (
    <Container fluid className="title">
      <Row>
        <Col md={1} className="col--small"></Col>
        <Col md={3} lg={4}>
          <Title name="title" sort={sort} handleSort={handleSort} />
        </Col>
        <Col md={1} className="col--extra--medium">
          <Title name="status" filter={filter} handleSort={handleSort} />
        </Col>
        <Col>
          <Title name="deadline" sort={sort} handleSort={handleSort} />
        </Col>
        <Col md={1} className="col--extra--medium">
          <Title name="priority" sort={sort} handleSort={handleSort} />
        </Col>
        <Col
          md={1}
          className={`${_.size(tasks) > 5 ? "col--scroll" : "col--medium"}`}
        ></Col>
      </Row>
    </Container>
  );
}
