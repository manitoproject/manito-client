import styled from '@emotion/styled';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { HamburgerMenu, LeftChevron } from '../../assets/svg';
import headerNavigation, { HeaderNavigation } from '../../lib/headerNavigation';
import { getFontSizeAndWeight } from '../../styles/utils';
import Sidebar from './sidebar';

interface HeaderProps {
  header: HeaderNavigation | null;
}

export default function Header({ header }: HeaderProps) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const headerInfo =
    headerNavigation.find(
      (header) => location.pathname === header.pathname(),
    ) ?? headerNavigation[headerNavigation.length - 1];
  return (
    <StyledHeader bgColor={header?.bgColor} textColor={header?.textColor}>
      <div>
        {(header?.isShowLeftBtn ?? headerInfo.isShowLeftBtn) && (
          <LeftButton
            textColor={header?.textColor}
            onClick={() => navigate(-1)}
          >
            <LeftChevron />
          </LeftButton>
        )}
        <h1>{header?.title ?? headerInfo.title}</h1>
        {(header?.isShowMenuBtn ?? headerInfo.isShowMenuBtn) && (
          <MenuButton
            textColor={header?.textColor}
            onClick={() => setIsSideMenuOpen(true)}
          >
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
const StyledHeader = styled.header<{ bgColor?: string; textColor?: string }>`
  width: 100%;
  background-color: ${(props) => props.bgColor ?? props.theme.colors.white};
  border-bottom: ${(props) =>
    props.bgColor
      ? props.bgColor
      : `1px solid ${props.theme.colors.gray[300]}`};
  /* z-index: 50;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1); */
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
    color: ${(props) => props.textColor ?? props.theme.colors.gray[800]};
    padding: ${(props) => `0 ${props.theme.sizes.padding}`};
    padding-top: 14px;
    padding-bottom: 14px;
    ${getFontSizeAndWeight('heading3', 'medium')}
  }
`;

const LeftButton = styled.button<{ textColor?: string }>`
  svg {
    rect {
      fill: ${(props) =>
        props.textColor ? 'transparent' : props.theme.colors.white};
    }
    path {
      stroke: ${(props) => props.textColor};
    }
  }
`;

const MenuButton = styled.button<{ textColor?: string }>`
  svg {
    path {
      stroke: ${(props) => props.textColor ?? 'inherit'};
    }
  }
  margin-left: auto;
`;
