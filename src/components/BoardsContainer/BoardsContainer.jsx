import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Board from './Board/Board';
import BoardCreationButton from './BoardCreation/BoardCreationButton';
import BoardCreationForm from './BoardCreation/BoardCreationForm';
import ModalWindow from '../ModalWindow/ModalWindow';
import {
  setNewBoardAction,
  removeBoardAction,
  getBoardsListAction,
} from '../../actions/actionsCreators';

const BoardsContainerBlock = styled.div`
  height: calc(100vh - 65px);
  overflow: auto;
  padding: 5%;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

class BoardsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeModalWindow: false,
      activeId: '',
    };
  }

  showResults = ({ boardName }) => {
    const { setNewBoard, getBoardsList } = this.props;

    getBoardsList({
      boardName,
      boardId: (
        Date.now().toString(36) +
        Math.random()
          .toString(36)
          .substr(2, 5)
      ).toUpperCase(),
      data: [],
    });
    setNewBoard(false);
  };

  onDeleteBoardClick = (event) => {
    const { id } = event.target;

    this.setState({
      activeId: id.substring(7),
      activeModalWindow: true,
    });
  };

  onDeleteBoardAccept = () => {
    const {
      props: { removeBoard },
      state: { activeId },
    } = this;

    removeBoard({
      activeBoardId: activeId,
    });
    this.setState({
      activeModalWindow: false,
    });
  };

  onDeleteBoardCancel = () => {
    this.setState({
      activeModalWindow: false,
    });
  };

  render() {
    const {
      showResults,
      onDeleteBoardClick,
      onDeleteBoardAccept,
      onDeleteBoardCancel,
      props: { newBoard, boardsList },
      state: { activeModalWindow },
    } = this;

    return (
      <BoardsContainerBlock>
        {activeModalWindow && (
          <ModalWindow
            windowMassage="Are you sure?"
            windowAccept={onDeleteBoardAccept}
            windowCancel={onDeleteBoardCancel}
          />
        )}
        <InnerContainer>
          {boardsList &&
            boardsList.map(({ boardName, boardId }) => (
              <Board
                boardName={boardName}
                onDeleteBoardClick={onDeleteBoardClick}
                boardId={boardId}
                key={boardId}
              />
            ))}
          {newBoard ? (
            <BoardCreationForm onSubmit={showResults} />
          ) : (
            <BoardCreationButton />
          )}
        </InnerContainer>
      </BoardsContainerBlock>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setNewBoard: (status) => dispatch(setNewBoardAction(status)),
  removeBoard: (data) => dispatch(removeBoardAction(data)),
  getBoardsList: (boardData) => dispatch(getBoardsListAction(boardData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardsContainer);

BoardsContainer.propTypes = {
  boardsList: PropTypes.array.isRequired,
  setNewBoard: PropTypes.func.isRequired,
  removeBoard: PropTypes.func.isRequired,
  getBoardsList: PropTypes.func.isRequired,
  newBoard: PropTypes.bool.isRequired,
};
