import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Hamburger from '../assets/svg/hamburger-menu.svg';
import LeftChevron from '../assets/svg/left-chevron.svg';
import { getFontSizeAndWeight } from '../styles/utils';

const HEADER_OPTIONS = {
  join: {
    pathname: '/join',
    title: '회원 가입',
    isShowLeftBtn: true,
    isShowMenuBtn: false,
  },
  home: {
    pathname: '/home',
    title: '메인 페이지',
    isShowLeftBtn: false,
    isShowMenuBtn: true,
  },
  'home/rolling-paper': {
    pathname: '/home/rolling-paper',
    title: 'Hello Roling',
    isShowLeftBtn: true,
    isShowMenuBtn: false,
  },
  index: {
    pathname: '',
    title: '마니또',
    isShowLeftBtn: true,
    isShowMenuBtn: false,
  },
};

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.slice(1);
  console.log(location);
  const header =
    pathname in HEADER_OPTIONS
      ? HEADER_OPTIONS[pathname as keyof typeof HEADER_OPTIONS]
      : HEADER_OPTIONS['index'];
  return (
    <StyledWrapper>
      <StyledHeader>
        <div>
          {header.isShowLeftBtn && (
            <button onClick={() => navigate(-1)}>
              <LeftChevron />
            </button>
          )}
          <div>{header.title}</div>
          {header.isShowMenuBtn && (
            <MenuButton>
              <Hamburger />
            </MenuButton>
          )}
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.colors.gray[800]};
    padding: ${({ theme }) => `0 ${theme.sizes.padding}`};
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
    padding: ${theme.sizes.padding} ${theme.sizes.padding} 0;
    max-width: ${theme.sizes.mobile};
  `}
  margin: 0 auto;
`;

const MenuButton = styled.button`
  margin-left: auto;
`;
