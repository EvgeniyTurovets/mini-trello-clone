import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { setActiveBoardNameAction } from '../../actions/actionsCreators';
import boardsImg from '../../assets/boards.svg';
import userImg from '../../assets/user.svg';

const HeaderBlock = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 65px;
  background-color: rgba(159, 231, 164, 0.7);
  overflow: hidden;
  font-size: 1.5rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  @media screen and (max-width: 768px) {
    padding: 0 10px;
  }
`;

const Button = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.55) url(${(props) => props.image}) no-repeat
    50% 50%;
  transition: all 200ms ease-in-out;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.23);

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Title = styled.div`
  color: white;
  margin: 0 5px;
  text-shadow: 0px 0px 3px #000;
  word-break: break-word;
  text-align: center;
`;

const Header = ({ activeBoardName, setActiveBoardName }) => {
  return (
    <HeaderBlock>
      <Link to="/">
        <Button
          type="button"
          aria-label="boards"
          image={boardsImg}
          onClick={() => setActiveBoardName('My Boards')}
        />
      </Link>
      <Title>{activeBoardName}</Title>
      <div>
        <Button type="button" aria-label="users" image={userImg} />
      </div>
    </HeaderBlock>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setActiveBoardName: (name) => dispatch(setActiveBoardNameAction(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

Header.propTypes = {
  activeBoardName: PropTypes.string.isRequired,
  setActiveBoardName: PropTypes.func.isRequired,
};
