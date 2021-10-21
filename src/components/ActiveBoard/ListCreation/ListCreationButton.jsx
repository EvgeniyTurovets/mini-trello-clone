import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { setNewListAction } from '../../../actions/actionsCreators';

const CreationButton = styled.button`
  width: calc(33.3% - 20px);
  margin: 10px;
  padding: 55px 0;
  border-radius: 5px;
  background-color: rgba(10, 44, 116, 0.85);
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
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

class ListCreationButton extends React.Component {
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
      props: { setNewList },
      state: { animation },
    } = this;

    return (
      <CreationButton
        type="button"
        animation={animation}
        onClick={() => setNewList(true)}
      >
        Create a new list...
      </CreationButton>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setNewList: (status) => dispatch(setNewListAction(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListCreationButton);

ListCreationButton.propTypes = {
  setNewList: PropTypes.func.isRequired,
};
