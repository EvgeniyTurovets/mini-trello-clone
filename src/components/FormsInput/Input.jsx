import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: ${(props) =>
    props.activeInput
      ? `0 3px 6px rgba(188, 0, 0, 0.45),
  0 3px 6px rgba(188, 0, 0, 0.45)`
      : `0 3px 6px rgba(0, 0, 0, 0.16),
  0 3px 6px rgba(0, 0, 0, 0.23)`};
`;

const Error = styled.p`
  position: absolute;
  width: 100%;
  bottom: 0;
  font-size: 0.7rem;
  text-shadow: 0px 0px 3px white;
  text-align: center;
`;

class TaskCreationInput extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  componentDidMount() {
    const { inputRef } = this;

    inputRef.current.focus();
  }

  getErrorStyles = () => {
    const {
      meta: { touched, error },
    } = this.props;

    if (touched && error) {
      return true;
    }
    return false;
  };

  render() {
    const {
      inputRef,
      props: {
        input,
        type,
        meta: { touched, error },
      },
      getErrorStyles,
    } = this;

    return (
      <Container>
        <Input
          {...input}
          type={type}
          ref={inputRef}
          autoComplete="off"
          activeInput={getErrorStyles()}
        />
        {touched && error && <Error>{error}</Error>}
      </Container>
    );
  }
}

export default TaskCreationInput;

TaskCreationInput.propTypes = {
  type: PropTypes.string.isRequired,
  meta: PropTypes.any.isRequired,
  input: PropTypes.any.isRequired,
};
