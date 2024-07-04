import styled from '@emotion/styled';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { HamburgerMenu, LeftChevron } from '../assets/svg';
import headerNavigation from '../lib/headerNavigation';
import { getFontSizeAndWeight } from '../styles/utils';
import Sidebar from './sidebar';

export default function Header() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const header =
    headerNavigation.find(
      (header) => location.pathname === header.pathname(),
    ) ?? headerNavigation[headerNavigation.length - 1];
  return (
    <StyledHeader>
      <div>
        {header.isShowLeftBtn && (
          <button onClick={() => navigate(-1)}>
            <LeftChevron />
          </button>
        )}
        <h1>{header.title}</h1>
        {header.isShowMenuBtn && (
          <MenuButton onClick={() => setIsSideMenuOpen(true)}>
            <HamburgerMenu />
          </MenuButton>
        )}
      </div>
      <Sidebar
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
      />
    </StyledHeader>
  );
}
const StyledHeader = styled.header`
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  border-bottom: 1px solid ${(props) => props.theme.colors.gray[300]};
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  & > div:first-child {
    position: relative;
    h1 {
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
const MenuButton = styled.button`
  margin-left: auto;
`;
