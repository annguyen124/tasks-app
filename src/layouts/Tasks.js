import React from "react";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import Checkbox from "components/Checkbox";
import DropdownButton from "components/DropdownButton";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { PRIORITIES } from "constants";

export default function Task(props) {
  const {
    tasks,
    handleShow,
    handleShowConfirm,
    handleChangeStatus,
    handleDnD,
  } = props;

  const renderTooltip = (title) => (props) => {
    return (
      <Tooltip id="button-tooltip" {...props}>
        {title}
      </Tooltip>
    );
  };
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = [...tasks];
    const [source] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, source);
    handleDnD(items);
  };
  return (
    <DragDropContext onDragEnd={(result) => handleOnDragEnd(result)}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="tasks"
          >
            {tasks.map((task, index) => (
              <Draggable
                key={_.get(task, "id")}
                draggableId={_.get(task, "id")}
                index={index}
              >
                {(provided, snapshot) => (
                  <Container
                    fluid
                    key={_.get(task, "id")}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={snapshot.draggingOver ? "task--dragging" : ""}
                  >
                    <Row className="task"  {...provided.dragHandleProps}>
                      <Col md={1} className="col--small">
                        <Checkbox
                          task={task}
                          handleChangeStatus={handleChangeStatus}
                        />
                      </Col>
                      <Col
                       
                        className="task__title"
                        md={3} lg={4} xs={11}
                      >
                        <p>{_.get(task, "title")}</p>
                        <p className="task__desc">
                          {_.get(task, "description")}
                        </p>
                      </Col>
                      <Col md={1} xs={4} className="col--extra--medium">
                        <DropdownButton
                          value={_.get(task, "status")}
                          handleChange={handleChangeStatus}
                          task={task}
                        />
                      </Col>
                      <Col className="deadline"> {_.get(task, "deadline")} </Col>
                      <Col md={1} className="col--extra--medium col--priority">
                        <div
                          className={`priority ${
                            PRIORITIES[_.get(task, "priority")]
                          }`}
                        >
                          <i className="bi bi-circle-fill"></i>{" "}
                          {PRIORITIES[_.get(task, "priority")]}
                        </div>
                      </Col>
                      <Col md={1} className="col--action">
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 100, hide: 0 }}
                          overlay={renderTooltip("Edit")}
                        >
                          <i
                            className="bi bi-pencil"
                            onClick={() => handleShow(task)}
                          ></i>
                        </OverlayTrigger>
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 100, hide: 0 }}
                          overlay={renderTooltip("Delete")}
                        >
                          <i
                            className="bi bi-trash"
                            onClick={() => handleShowConfirm(task)}
                          ></i>
                        </OverlayTrigger>
                      </Col>
                    </Row>
                  </Container>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
