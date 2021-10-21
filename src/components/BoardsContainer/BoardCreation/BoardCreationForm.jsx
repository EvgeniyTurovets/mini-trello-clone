import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';

import Input from '../../FormsInput/Input';
import { setNewBoardAction } from '../../../actions/actionsCreators';
import {
  requiredName,
  emptyName,
} from '../../../formValidators/formValidators';
import crossImg from '../../../assets/cross.svg';

const BoardForm = styled.form`
  width: calc(33.3% - 20px);
  margin: 10px;
  padding: 30px 0;
  border-radius: 5px;
  background-color: #9fe7a4;
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

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid white;
  font-weight: 600;
  color: white;
  text-shadow: 0px 0px 3px #000;
`;

const BoardCross = styled.button`
  width: 24px;
  height: 24px;
  background: url(${crossImg}) no-repeat 50% 50%;
  border-radius: 50%;
  transition: all 200ms ease-in-out;

  &:hover {
    transform: scale(1.3);
  }
`;

const BoardMain = styled.div`
  font-size: 0.9rem;
  padding: 0 10%;
`;

const BoardMainTitle = styled.div`
  padding: 30px 0 20px;
  color: white;
  text-shadow: 0px 0px 3px #000;
`;

const BoardButtonContainer = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const BoardCancelButton = styled.button`
  margin: 0 10px;
  width: 100px;
  height: 40px;
  transition: all 200ms ease-in-out;
  background-color: #9fe7a4;
  color: white;
  font-family: 'Montserrat', sans-serif;
  text-shadow: 0px 0px 3px #000;
  font-weight: 500;

  &:hover {
    color: #02e2ea;
    transform: scale(1.1);
  }
`;

const BoardSubmitButton = styled.button`
  margin: 0 10px;
  width: 100px;
  height: 40px;
  transition: all 200ms ease-in-out;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  &:hover {
    color: #02e2ea;
    transform: scale(1.1);
  }
`;

class BoardCreationForm extends React.Component {
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
      props: { setNewBoard, handleSubmit },
      state: { animation },
    } = this;

    return (
      <BoardForm onSubmit={handleSubmit} animation={animation}>
        <BoardHeader>
          <div>Creating a board</div>
          <BoardCross
            type="button"
            aria-label="new-board-cross"
            onClick={() => setNewBoard(false)}
          />
        </BoardHeader>
        <BoardMain>
          <BoardMainTitle>What shall we call the board?</BoardMainTitle>
          <Field
            name="boardName"
            component={Input}
            type="text"
            validate={[requiredName, emptyName]}
          />
          <BoardButtonContainer>
            <BoardCancelButton type="button" onClick={() => setNewBoard(false)}>
              CANCEL
            </BoardCancelButton>
            <BoardSubmitButton type="submit">CREATE</BoardSubmitButton>
          </BoardButtonContainer>
        </BoardMain>
      </BoardForm>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setNewBoard: (status) => dispatch(setNewBoardAction(status)),
});

const decoratedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardCreationForm);

export default reduxForm({
  form: 'createNewBoard',
})(decoratedComponent);

BoardCreationForm.propTypes = {
  setNewBoard: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
