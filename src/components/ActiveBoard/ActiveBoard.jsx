import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import TaskList from './TaskList/TaskList';
import ListCreationButton from './ListCreation/ListCreationButton';
import ListCreationForm from './ListCreation/ListCreationForm';
import ModalWindow from '../ModalWindow/ModalWindow';
import PageNotFound from '../PageNotFound';
import {
  setNewListAction,
  createNewListAction,
  taskDragHappenedAction,
  setActiveBoardNameAction,
  allReadyAction,
  allInWorkAction,
  removeReadyAction,
  removeListAction,
} from '../../actions/actionsCreators';

const BoardContainer = styled.div`
  height: calc(100vh - 65px);
  overflow: auto;
  padding: 5%;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

class ActiveBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeModalWindow: false,
      activeTasksListId: '',
      eventId: '',
    };
  }

  componentDidMount() {
    const { setActiveBoardName } = this.props;

    if (this.activeBoard) {
      const { boardName } = this.activeBoard;

      setActiveBoardName(boardName);
    } else {
      setActiveBoardName('Board Not Found');
    }
  }

  showNewListData = ({ listName }) => {
    const {
      activeBoard: { boardId },
      props: { createNewList, setNewList },
    } = this;

    createNewList({
      activeBoardId: boardId,
      listData: {
        listName,
        listId: (
          Date.now().toString(36) +
          Math.random()
            .toString(36)
            .substr(2, 7)
        ).toUpperCase(),
        tasks: [],
      },
    });
    setNewList(false);
  };

  onDragEnd = (result) => {
    const {
      activeBoard: { boardId },
      props: { taskDragHappened },
    } = this;
    const { destination, source, draggableId } = result;

    if (destination) {
      taskDragHappened({
        activeBoardId: boardId,
        droppableIdStart: source.droppableId,
        droppableIdEnd: destination.droppableId,
        droppableIndexStart: source.index,
        droppableIndexEnd: destination.index,
        droppableId: draggableId,
      });
    }
  };

  onListMenuClick = (event, listId) => {
    const {
      target: { id },
    } = event;
    this.setState({
      activeModalWindow: true,
      activeTasksListId: listId,
      eventId: id,
    });
  };

  onListMenuAccept = () => {
    const {
      activeBoard: { boardId },
      props: { allReady, allInWork, removeReady, removeList },
      state: { eventId, activeTasksListId },
    } = this;
    const data = {
      activeBoardId: boardId,
      activeTasksListId,
    };

    switch (eventId) {
      case 'all_ready': {
        allReady(data);
        this.setState({
          activeModalWindow: false,
        });
        break;
      }
      case 'all_in_work': {
        allInWork(data);
        this.setState({
          activeModalWindow: false,
        });
        break;
      }
      case 'remove_ready': {
        removeReady(data);
        this.setState({
          activeModalWindow: false,
        });
        break;
      }
      case 'remove_list': {
        removeList(data);
        this.setState({
          activeModalWindow: false,
        });
        break;
      }
      default:
    }
  };

  onDeleteBoardCancel = () => {
    this.setState({
      activeModalWindow: false,
    });
  };

  updateActiveBoard = () => {
    const {
      boardsList,
      match: {
        params: { boardId },
      },
    } = this.props;

    this.activeBoard = boardsList.find((board) => board.boardId === boardId);
  };

  render() {
    this.updateActiveBoard();

    const {
      showNewListData,
      activeBoard,
      onDragEnd,
      onListMenuClick,
      onListMenuAccept,
      onDeleteBoardCancel,
      props: { newList },
      state: { activeModalWindow },
    } = this;

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <BoardContainer>
          {activeModalWindow && (
            <ModalWindow
              windowMassage="Are you sure?"
              windowAccept={onListMenuAccept}
              windowCancel={onDeleteBoardCancel}
            />
          )}
          {activeBoard ? (
            <InnerContainer>
              {activeBoard.data.map(({ listName, listId }) => (
                <TaskList
                  listId={listId}
                  key={listId}
                  listName={listName}
                  activeBoard={activeBoard}
                  onListMenuClick={onListMenuClick}
                />
              ))}
              {newList ? (
                <ListCreationForm onSubmit={showNewListData} />
              ) : (
                <ListCreationButton />
              )}
            </InnerContainer>
          ) : (
            <PageNotFound />
          )}
        </BoardContainer>
      </DragDropContext>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setNewList: (status) => dispatch(setNewListAction(status)),
  createNewList: (listData) => dispatch(createNewListAction(listData)),
  taskDragHappened: (data) => dispatch(taskDragHappenedAction(data)),
  setActiveBoardName: (name) => dispatch(setActiveBoardNameAction(name)),
  allReady: (data) => dispatch(allReadyAction(data)),
  allInWork: (data) => dispatch(allInWorkAction(data)),
  removeReady: (data) => dispatch(removeReadyAction(data)),
  removeList: (data) => dispatch(removeListAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveBoard);

ActiveBoard.propTypes = {
  setNewList: PropTypes.func.isRequired,
  createNewList: PropTypes.func.isRequired,
  taskDragHappened: PropTypes.func.isRequired,
  setActiveBoardName: PropTypes.func.isRequired,
  newList: PropTypes.bool.isRequired,
  boardsList: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  allReady: PropTypes.func.isRequired,
  allInWork: PropTypes.func.isRequired,
  removeReady: PropTypes.func.isRequired,
  removeList: PropTypes.func.isRequired,
};
