import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/header/header';
import Sidebar from '../components/header/sidebar';
import {
  StyledBrowserBackdrop,
  StyledMain,
  StyledWrapper,
} from './layout.style';

export default function Layout() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <StyledWrapper>
      <Header onSidebarOpen={() => setIsSideMenuOpen(true)} />
      <StyledMain>{<Outlet />}</StyledMain>
      <Sidebar
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
      />
      <StyledBrowserBackdrop />
    </StyledWrapper>
  );
}
