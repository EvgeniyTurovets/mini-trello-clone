import * as React from 'react';
import styled from 'styled-components';

const PageNotFoundContainer = styled.div`
  height: calc(100vh - 65px);
  overflow: auto;
  padding: 25vh 5% 5%;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  font-size: 2rem;
  line-height: 3rem;
  opacity: 0.2;
`;

const PageNotFound = () => {
  return (
    <PageNotFoundContainer>
      <p>404</p>
      <p>Page Not Found</p>
    </PageNotFoundContainer>
  );
};

export default PageNotFound;
