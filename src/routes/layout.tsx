import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import Header from '../components/header';
import Sidebar from '../components/header/sidebar';
import { HeaderNavigation } from '../lib/header-map';
import theme from '../styles/theme';

const getBoard = async (id?: string) => {
  if (!id) return;
  const { data } = await axios<Board>(`/board/${id}`);
  return data;
};

export default function Layout() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const params = useParams();
  const id = params.id;
  const { data } = useQuery({
    queryFn: () => getBoard(id),
    queryKey: ['board', id],
  });
  const header: HeaderNavigation | null = data?.subject
    ? {
        title: data.subject,
        isShowLeftBtn: true,
        isShowMenuBtn: true,
        bgColor: theme.colors.powderBlue[900],
        textColor: theme.colors.white,
        pathname: () => data.subject,
        theme: data.theme,
      }
    : null;
  return (
    <StyledWrapper>
      <Header header={header} onSidebarOpen={() => setIsSideMenuOpen(true)} />
      <StyledMain bg={header?.theme}>{<Outlet />}</StyledMain>
      <Sidebar
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
      />
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

const StyledMain = styled.main<{ bg?: string }>`
  background-image: ${(props) =>
    props.theme ? `url('/src/assets/imgs/bg/${props.bg}.png')` : 'none'};
  background-size: cover;
  background-color: ${(props) => props.theme.colors.white};
  width: 100%;
  flex: 1;
  display: flex;
  ${({ theme }) =>
    css`
      padding-left: ${theme.sizes.padding};
      padding-right: ${theme.sizes.padding};
      padding-top: calc(${theme.sizes.padding} + ${theme.sizes.header});
    `}
`;
