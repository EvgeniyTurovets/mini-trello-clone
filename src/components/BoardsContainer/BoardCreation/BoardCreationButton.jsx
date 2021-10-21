import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { setNewBoardAction } from '../../../actions/actionsCreators';

const CreateNewBoard = styled.button`
  width: calc(33.3% - 20px);
  margin: 10px;
  padding: 55px 0;
  border-radius: 5px;
  background-color: #9fe7a4;
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  text-shadow: 0px 0px 3px #000;
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

class BoardCreationButton extends React.Component {
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
      props: { setNewBoard },
      state: { animation },
    } = this;

    return (
      <CreateNewBoard
        className="boards_container_new_board_button"
        type="button"
        onClick={() => setNewBoard(true)}
        animation={animation}
      >
        Create a new board...
      </CreateNewBoard>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setNewBoard: (status) => dispatch(setNewBoardAction(status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardCreationButton);

BoardCreationButton.propTypes = {
  setNewBoard: PropTypes.func.isRequired,
};
