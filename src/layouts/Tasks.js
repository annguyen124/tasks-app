import React from "react";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import Checkbox from "components/Checkbox";
import DropdownButton from "components/DropdownButton";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
      <Droppable droppableId="characters">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="task__container"
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <Container
                    fluid
                    key={task.id}
                    className="task"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <Row className="task__item">
                      <Col md={1} className="col--small">
                        <Checkbox
                          task={task}
                          handleChangeStatus={handleChangeStatus}
                        />
                      </Col>
                      <Col
                        {...provided.dragHandleProps}
                        className="task__title"
                      >
                        <p>{task.title}</p>
                        <p className="task-desc">{task.description}</p>
                      </Col>
                      <Col md={1} className="col--extra--medium">
                        <DropdownButton
                          task={task}
                          handleChangeStatus={handleChangeStatus}
                        />
                      </Col>
                      <Col>{task.deadline} </Col>
                      <Col md={1} className="col--extra--medium">
                        <div className={`priority ${task.priority}`}>
                          {task.priority}
                        </div>
                      </Col>
                      <Col md={1} className="col--medium col--action">
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
