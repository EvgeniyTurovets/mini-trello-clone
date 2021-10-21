import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';

import Input from '../../FormsInput/Input';
import {
  requiredName,
  emptyName,
} from '../../../formValidators/formValidators';
import { setNewListAction } from '../../../actions/actionsCreators';
import crossImg from '../../../assets/cross.svg';

const ListForm = styled.form`
  position: relative;
  width: calc(33.3% - 20px);
  margin: 10px;
  padding: 10px;
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

const ListFormTitle = styled.div`
  margin: 10px 10px 20px;
`;

const ListCrossButton = styled.button`
  position: absolute;
  right: -10px;
  top: -10px;
  width: 24px;
  height: 24px;
  background: url(${crossImg}) no-repeat 50% 50% / cover;
  transition: all 200ms ease-in-out;

  &:hover {
    transform: scale(1.2) rotate(-15deg);
  }
`;

const ListButtonContainer = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const ListCancelButton = styled.button`
  margin: 0 10px;
  width: 100px;
  height: 40px;
  border-radius: 5px;
  transition: all 200ms ease-in-out;
  background-color: white;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  &:hover {
    color: #02e2ea;
    transform: scale(1.1);
  }
`;

const ListSubmitButton = styled.button`
  margin: 0 10px;
  width: 100px;
  height: 40px;
  border-radius: 5px;
  background-color: rgba(159, 231, 164, 0.7);
  color: white;
  text-shadow: 0px 0px 3px #000;
  transition: all 200ms ease-in-out;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  &:hover {
    color: #02e2ea;
    transform: scale(1.1);
  }
`;

class ListCreationForm extends React.Component {
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
      props: { handleSubmit, setNewList },
      state: { animation },
    } = this;

    return (
      <ListForm onSubmit={handleSubmit} animation={animation}>
        <ListFormTitle>Enter list name</ListFormTitle>
        <Field
          name="listName"
          type="text"
          component={Input}
          validate={[requiredName, emptyName]}
        />
        <ListCrossButton
          type="button"
          aria-label="cancel"
          onClick={() => setNewList(false)}
        />
        <ListButtonContainer>
          <ListCancelButton type="button" onClick={() => setNewList(false)}>
            CANCEL
          </ListCancelButton>
          <ListSubmitButton type="submit">CREATE</ListSubmitButton>
        </ListButtonContainer>
      </ListForm>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setNewList: (status) => dispatch(setNewListAction(status)),
});

const decoratedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListCreationForm);

export default reduxForm({
  form: 'listCreationForm',
})(decoratedComponent);

ListCreationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  setNewList: PropTypes.func.isRequired,
};
