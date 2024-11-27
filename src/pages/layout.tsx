import { Outlet, ScrollRestoration } from 'react-router-dom';

import Header from '@/components/header/header';
import LoginModal from '@/components/modal/login-modal';
import {
  StyledBrowserBackdrop,
  StyledMain,
  StyledWrapper,
} from '@/pages/layout.style';

export default function Layout() {
  return (
    <StyledWrapper>
      <Header />
      <StyledMain>
        <div />
        <div>{<Outlet />}</div>
      </StyledMain>
      <LoginModal />
      <ScrollRestoration />
      <StyledBrowserBackdrop />
    </StyledWrapper>
  );
}
