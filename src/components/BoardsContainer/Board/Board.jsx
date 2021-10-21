import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavItem = styled.div`
  position: relative;
  text-align: center;
  width: calc(33.3% - 20px);
  margin: 10px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: transform 200ms ease-in-out, opacity 0.8s ease;
  opacity: ${(props) => (props.animation === 'animated' ? '1' : '0')};

  &:hover {
    transform: scale(1.05);
  }

  @media screen and (max-width: 1024px) {
    width: calc(50% - 20px);
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const CustomLink = styled(Link)`
  display: block;
  width: 100%;
  padding: 55px 20px;
  word-break: break-word;
  color: #333;
  font-size: 1.5rem;
  border-radius: 5px;
  text-decoration: none;
`;

const DeleteButton = styled.button`
  position: absolute;
  font-size: 2rem;
  border-radius: 5px;
  right: 0;
  top: 0;
  background: none;
  color: rgba(0, 0, 0, 0.1);
  transition: transform 200ms ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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

  render() {
    const {
      props: { boardId, boardName, onDeleteBoardClick },
      state: { animation },
    } = this;

    return (
      <NavItem id={boardId} animation={animation}>
        <CustomLink to={`/board/${boardId}`}>{boardName}</CustomLink>
        <DeleteButton
          id={`button:${boardId}`}
          type="button"
          onClick={onDeleteBoardClick}
        >
          ✘
        </DeleteButton>
      </NavItem>
    );
  }
}

export default Board;

Board.propTypes = {
  boardId: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired,
  onDeleteBoardClick: PropTypes.func.isRequired,
};
