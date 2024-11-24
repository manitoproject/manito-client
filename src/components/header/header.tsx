import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { HamburgerMenu, LeftChevron } from '@/assets/svg/icons';
import routes from '@/routes';
import { HeaderStore, useHeader } from '@/stores/header-store';
import { getFontSizeAndWeight } from '@/styles/mixins';
import { ColorName } from '@/styles/theme';

interface HeaderProps {
  onSidebarOpen: () => void;
}

export default function Header({ onSidebarOpen }: HeaderProps) {
  const header = useHeader();
  const navigate = useNavigate();

  const handleNavigation = () => {
    const isHomePage = location.pathname === routes.home;
    if (isHomePage) return navigate(routes.landing);
    return navigate(-1);
  };
  return (
    <StyledHeader header={header}>
      <div>
        {header.leftBtn && (
          <StyledLeftButton color={header.color} onClick={handleNavigation}>
            <LeftChevron />
          </StyledLeftButton>
        )}
        <h1>{header.title}</h1>
        {header.rightBtn && (
          <StyledMenuButton color={header.color} onClick={onSidebarOpen}>
            <HamburgerMenu />
          </StyledMenuButton>
        )}
      </div>
    </StyledHeader>
  );
}

export const StyledHeader = styled.header<{
  header: HeaderStore['title'];
}>`
  max-width: ${(props) => props.theme.sizes.mobile};
  width: 100%;
  z-index: 51;
  position: fixed;
  background-color: ${({ header, theme }) => theme.colors[header.bg]};
  border-bottom: ${({ header, theme }) =>
    header.bg === 'white' ? `1px solid ${theme.colors['gray-300']}` : 'none'};
  & > div {
    h1 {
      font-family: ${({ header, theme }) => theme.fontFamily[header.font]};
      ${getFontSizeAndWeight('heading2', 'medium')}
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({ header, theme }) => theme.colors[header.color]};
    padding: ${(props) => `0 ${props.theme.sizes.padding}`};
    padding-top: 16px;
    padding-bottom: 16px;
  }
`;

const StyledLeftButton = styled.button<{ color: ColorName }>`
  svg {
    path {
      stroke: ${({ color, theme }) =>
        color === 'gray-800' ? theme.colors['gray-500'] : theme.colors[color]};
    }
  }
`;

const StyledMenuButton = styled.button<{ color: ColorName }>`
  margin-left: auto;
  svg path {
    stroke: ${({ color, theme }) =>
      color === 'gray-800' ? theme.colors['gray-500'] : theme.colors[color]};
  }
`;
