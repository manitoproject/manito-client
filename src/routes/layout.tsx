import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

import Header from '../components/header';

export default function Layout() {
  return (
    <StyledWrapper>
      <Header />
      <StyledMain>{<Outlet />}</StyledMain>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.SpoqaHanSansNeo};
  line-height: normal;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const StyledMain = styled.main`
  z-index: 50;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  background-color: ${(props) => props.theme.colors.white};
  width: 100%;
  flex: 1;
  display: flex;
  ${({ theme }) => css`
    padding: ${theme.sizes.padding} ${theme.sizes.padding} 0;
    max-width: ${theme.sizes.mobile};
  `}
  margin: 0 auto;
`;
