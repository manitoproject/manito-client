import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import Header from '../components/header';
import Sidebar from '../components/header/sidebar';
import { HeaderNavigation } from '../lib/header-map';
import theme from '../styles/theme';
import { Backdrop, StyledMain, StyledWrapper } from './layout.style';

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
