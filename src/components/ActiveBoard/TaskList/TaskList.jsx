import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import Task from './TaskCreation/Task';
import TaskCreationForm from './TaskCreation/TaskCreationForm';
import ListMenu from './ListMenu/ListMenu';
import {
  createNewTaskAction,
  setTaskStatusAction,
} from '../../../actions/actionsCreators';
import menuImg from '../../../assets/menu.png';

const TasksList = styled.div`
  position: relative;
  width: calc(33.3% - 20px);
  margin: 10px;
  padding: 5px;
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: transform 200ms ease-in-out, opacity 0.8s ease;
  opacity: ${(props) => (props.animation === 'animated' ? '1' : '0')};

  @media screen and (max-width: 1024px) {
    width: calc(50% - 20px);
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const TasksListTitle = styled.div`
  margin: 20px 0;
  text-align: center;
  word-break: break-word;
`;

const TaskListMenu = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;
  width: 25px;
  height: 25px;
  background: white url(${menuImg}) no-repeat 50% 50% / contain;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
`;

const TasksListSeparator = styled.hr`
  height: 1px;
  width: 100%;
  margin: 2.5px 0 10px;
  opacity: 0.25;
`;

const TasksListInnerContainer = styled.div`
  width: 100%;
  padding: 0 5px;
  border-radius: 5px;
  min-height: ${(props) => (props.isDraggingOver ? '50px' : '10px')};
  background-color: ${(props) =>
    props.isDraggingOver ? 'rgba(247, 247, 116, 0.10)' : 'white'};
`;

const NewTaskButton = styled.button`
  transition: all 200ms ease-in-out;
  background: none;
  margin: 0 0 5px 10px;
  color: #dddddd;
  font-family: 'Montserrat', sans-serif;

  &:hover {
    color: gray;
    transform: scale(1.1);
  }
`;

class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      taskFormStatus: false,
      innerMenuStatus: false,
      animation: '',
    };
  }

  componentDidMount() {
    setTimeout(
      () =>
        this.setState({
          animation: 'animated',
        }),
      0
    );
  }

  showNewTaskData = ({ taskName }) => {
    const {
      activeTasksList: { listId },
      props: {
        createNewTask,
        activeBoard: { boardId },
      },
    } = this;

    createNewTask({
      activeBoardId: boardId,
      activeTasksListId: listId,
      taskData: {
        taskName,
        taskId: (
          Date.now().toString(36) +
          Math.random()
            .toString(36)
            .substr(2, 7)
        ).toUpperCase(),
        isCompleted: false,
      },
    });
  };

  newTaskStatus = (event) => {
    const { id } = event.target;
    const {
      activeTasksList: { listId, tasks },
      props: {
        activeBoard: { boardId },
        setTaskStatus,
      },
    } = this;
    const activeTaskStatus = tasks.find(
      (task) => task.taskId === id.substring(7)
    ).isCompleted;
    const data = {
      activeBoardId: boardId,
      activeTasksListId: listId,
      activeTaskId: id.substring(7),
    };

    setTaskStatus({
      ...data,
      isCompleted: !activeTaskStatus,
    });
  };

  newTaskFormStatus = () => {
    const { taskFormStatus } = this.state;

    this.setState({
      taskFormStatus: !taskFormStatus,
    });
  };

  onListMenuClick = (event) => {
    const {
      activeTasksList: { listId },
    } = this;
    const {
      target: { id },
    } = event;
    const data = {
      eventId: id,
      activeBoardId: boardId,
      activeTasksListId: listId,
    };
  };

  mouseEnter = () => {
    this.setState({
      innerMenuStatus: true,
    });
  };

  mouseLeave = () => {
    this.setState({
      innerMenuStatus: false,
    });
  };

  updateActiveTasksList = () => {
    const {
      listId,
      activeBoard: { data },
    } = this.props;

    this.activeTasksList = data.find((list) => list.listId === listId);
  };

  render() {
    this.updateActiveTasksList();

    const {
      showNewTaskData,
      newTaskStatus,
      newTaskFormStatus,
      mouseEnter,
      mouseLeave,
      state: { taskFormStatus, innerMenuStatus, animation },
      props: { listName, clearForm, listId, onListMenuClick },
      activeTasksList: { tasks },
    } = this;

    return (
      <TasksList animation={animation}>
        <TasksListTitle>{listName}</TasksListTitle>
        <TaskListMenu onFocus={mouseEnter} onBlur={mouseLeave}>
          {innerMenuStatus && (
            <ListMenu onListMenuClick={onListMenuClick} listId={listId} />
          )}
        </TaskListMenu>
        <TasksListSeparator />
        <Droppable droppableId={listId}>
          {(provided, snapshot) => (
            <TasksListInnerContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
              id={listId}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {tasks &&
                tasks.map(({ taskName, taskId, isCompleted }, index) => (
                  <Task
                    taskId={taskId}
                    key={taskId}
                    taskName={taskName}
                    isCompleted={isCompleted}
                    newTaskStatus={newTaskStatus}
                    index={index}
                  />
                ))}
              {provided.placeholder}
            </TasksListInnerContainer>
          )}
        </Droppable>
        {taskFormStatus ? (
          <TaskCreationForm
            onSubmit={(value) => {
              showNewTaskData(value);
              clearForm(`form:${listId}`);
              newTaskFormStatus();
            }}
            form={`form:${listId}`}
            newTaskFormStatus={newTaskFormStatus}
          />
        ) : (
          <NewTaskButton
            type="button"
            aria-label="cancel"
            onClick={newTaskFormStatus}
          >
            ✚ Add new task
          </NewTaskButton>
        )}
      </TasksList>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  clearForm: (formName) => dispatch(reset(formName)),
  createNewTask: (newTaskData) => dispatch(createNewTaskAction(newTaskData)),
  setTaskStatus: (status) => dispatch(setTaskStatusAction(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);

TaskList.propTypes = {
  listName: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  activeBoard: PropTypes.object.isRequired,
  createNewTask: PropTypes.func.isRequired,
  setTaskStatus: PropTypes.func.isRequired,
  clearForm: PropTypes.func.isRequired,
  onListMenuClick: PropTypes.func.isRequired,
};
