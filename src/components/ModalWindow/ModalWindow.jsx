import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  padding: 0 5px;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  transition: opacity 0.8s ease;
  opacity: ${(props) => (props.animation === 'animated' ? '1' : '0')};
`;

const WindowContainer = styled.div`
  width: 30%;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  @media screen and (max-width: 1024px) {
    width: 50%;
  }

  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;

const Title = styled.div`
  margin: 10px 10px 20px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  margin: 10px 0;
  text-align: center;
`;

const CancelButton = styled.button`
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

const AcceptButton = styled.button`
  margin: 0 10px;
  width: 100px;
  height: 40px;
  border-radius: 5px;
  background-color: rgba(159, 231, 164, 1);
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

class ModalWindow extends React.Component {
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
      state: { animation },
      props: { windowMassage, windowAccept, windowCancel },
    } = this;

    return (
      <Container animation={animation}>
        <WindowContainer>
          <Title>{windowMassage}</Title>
          <ButtonContainer>
            <CancelButton type="button" onClick={windowCancel}>
              NO
            </CancelButton>
            <AcceptButton type="button" onClick={windowAccept}>
              YES
            </AcceptButton>
          </ButtonContainer>
        </WindowContainer>
      </Container>
    );
  }
}

export default ModalWindow;

ModalWindow.propTypes = {
  windowMassage: PropTypes.string.isRequired,
  windowAccept: PropTypes.func.isRequired,
  windowCancel: PropTypes.func.isRequired,
};
