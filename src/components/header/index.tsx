import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';

import { HamburgerMenu, LeftChevron } from '../../assets/svg';
import headerNavigation, { HeaderNavigation } from '../../lib/headerNavigation';
import { getFontSizeAndWeight } from '../../styles/utils';

interface HeaderProps {
  header: HeaderNavigation | null;
  onSidebarOpen: () => void;
}

export default function Header({ header, onSidebarOpen }: HeaderProps) {
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
          <MenuButton textColor={header?.textColor} onClick={onSidebarOpen}>
            <HamburgerMenu />
          </MenuButton>
        )}
      </div>
    </StyledHeader>
  );
}
const StyledHeader = styled.header<{ bgColor?: string; textColor?: string }>`
  max-width: ${(props) => props.theme.sizes.mobile};
  width: 100%;
  z-index: 50;
  position: fixed;
  background-color: ${(props) => props.bgColor ?? props.theme.colors.white};
  border-bottom: ${(props) =>
    props.bgColor
      ? props.bgColor
      : `1px solid ${props.theme.colors.gray[300]}`};
  & > div:first-child {
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
