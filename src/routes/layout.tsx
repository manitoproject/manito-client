import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

import Header from '../components/header';

export default function Layout() {
  return (
    <StyledWrapper>
      <Header />
      <StyledMain>{<Outlet />}</StyledMain>
      <Backdrop />
    </StyledWrapper>
  );
}

export const Backdrop = styled.div`
  background-color: ${(props) => props.theme.colors.gray[100]};
  width: 100vw;
  height: 100vh;
  left: 0;
  z-index: -1;
  position: fixed;
`;

const StyledWrapper = styled.div`
  position: relative;
  font-family: ${({ theme }) => theme.fontFamily.SpoqaHanSansNeo};
  line-height: normal;
  min-height: 100vh;
  display: flex;
  width: 100%;
  max-width: ${(props) => props.theme.sizes.mobile};
  margin: 0 auto;
  flex-direction: column;
  overflow: hidden;
`;

const StyledMain = styled.main`
  /* z-index: 50;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1); */
  /* background-image: url('/src/assets/imgs/space-theme.png'); */
  background-size: cover;
  background-color: ${(props) => props.theme.colors.white};
  width: 100%;
  flex: 1;
  display: flex;
  padding: ${({
    theme: {
      sizes: { padding },
    },
  }) => `${padding} ${padding} 0`};
`;
