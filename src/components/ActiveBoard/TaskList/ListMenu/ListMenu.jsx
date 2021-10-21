import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

const MainBlock = styled.ul`
  position: absolute;
  z-index: 3;
  top: 10px;
  right: 10px;
  width: 150px;
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: opacity 0.5s ease;
  opacity: ${(props) => (props.animation === 'animated' ? '1' : '0')};
`;

const NavButton = styled.li`
  width: 100%;
  padding: 5px 0;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.16);
  transition: all 200ms ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

class ListMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animation: '',
    };

    this.buttonsData = [
      {
        name: 'all ready',
        id: 'all_ready',
      },
      {
        name: 'all in work',
        id: 'all_in_work',
      },
      {
        name: 'remove ready',
        id: 'remove_ready',
      },
      {
        name: 'remove list',
        id: 'remove_list',
      },
    ];
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
      props: { onListMenuClick, listId },
      state: { animation },
      buttonsData,
    } = this;

    return (
      <MainBlock animation={animation}>
        {buttonsData.map((item) => (
          <NavButton
            key={`${item.name}`}
            id={item.id}
            onClick={(event) => {
              onListMenuClick(event, listId);
            }}
          >
            {item.name}
          </NavButton>
        ))}
      </MainBlock>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(ListMenu);

ListMenu.propTypes = {
  onListMenuClick: PropTypes.func.isRequired,
  listId: PropTypes.string.isRequired,
};
