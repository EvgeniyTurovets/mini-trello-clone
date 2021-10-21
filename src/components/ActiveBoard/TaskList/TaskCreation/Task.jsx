import * as React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const TaskBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 10px 0;
  padding: 15px 20px;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: ${(props) =>
    props.isCompleted ? 'rgb(243, 236, 255)' : 'rgb(202, 255, 222)'};
  text-decoration: ${(props) => (props.isCompleted ? 'line-through' : 'none')};
  color: ${(props) =>
    props.isCompleted ? 'rgba(0, 0, 0, 0.35)' : 'rgba(0, 0, 0, 1)'};
`;

const TaskButton = styled.div`
  background: none;
  transition: all 200ms ease-in-out;
  opacity: 0.4;
  cursor: pointer;

  &:hover {
    transform: scale(1.3);
  }
`;

const TaskName = styled.p`
  word-break: break-word;
`;

const Task = (props) => {
  const { taskId, taskName, isCompleted, newTaskStatus, index } = props;

  return (
    <Draggable draggableId={taskId} index={index}>
      {(provided) => (
        <TaskBlock
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          id={taskId}
          isCompleted={isCompleted}
        >
          <TaskName>{taskName}</TaskName>
          <TaskButton
            id={`button:${taskId}`}
            type="button"
            onClick={newTaskStatus}
          >
            ✓
          </TaskButton>
        </TaskBlock>
      )}
    </Draggable>
  );
};

export default Task;

Task.propTypes = {
  newTaskStatus: PropTypes.func.isRequired,
  taskId: PropTypes.string.isRequired,
  taskName: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};
