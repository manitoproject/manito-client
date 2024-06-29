import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

import Hamburger from '../assets/svg/hamburger-menu.svg';
import { getFontSizeAndWeight } from '../styles/utils';
export default function Layout() {
  return (
    <StyledWrapper>
      <StyledHeader>
        <div>
          <div>메인 페이지</div>
          <button>
            <Hamburger />
          </button>
        </div>
      </StyledHeader>
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

const StyledHeader = styled.header`
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.mobile};
  margin: 0 auto;
  background-color: ${(props) => props.theme.colors.white};
  border-bottom: 1px solid ${(props) => props.theme.colors.gray[300]};
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  z-index: 50;
  & > div {
    position: relative;
    div {
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
    }
    button {
      margin-left: 90px;
    }
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: ${({ theme }) => theme.colors.gray[800]};
    padding: ${({ theme }) => theme.sizes.padding};
    padding-top: 14px;
    padding-bottom: 14px;
    ${getFontSizeAndWeight('heading3', 'medium')}
  }
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
    padding: ${theme.sizes.padding};
    max-width: ${theme.sizes.mobile};
  `}
  margin: 0 auto;
`;
