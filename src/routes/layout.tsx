import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Toast from '../components/common/toast';
import Header from '../components/header/header';
import Sidebar from '../components/header/sidebar';
import LoginModal from '../components/modal/login-modal';
import { useUserQuery } from '../queries/users';
import {
  StyledBrowserBackdrop,
  StyledMain,
  StyledWrapper,
} from './layout.style';

export default function Layout() {
  const { data } = useUserQuery();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleSidebarOpen = () => {
    if (!data?.data?.id) return setIsLoginModalOpen(true);
    setIsSideMenuOpen(true);
  };

  return (
    <StyledWrapper>
      <Header onSidebarOpen={handleSidebarOpen} />
      <StyledMain>
        <div />
        <div>{<Outlet />}</div>
      </StyledMain>
      <Sidebar
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
      />
      <StyledBrowserBackdrop />
      <Toast />
      {isLoginModalOpen && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onToggleModal={() => setIsLoginModalOpen((prev) => !prev)}
        />
      )}
    </StyledWrapper>
  );
}
