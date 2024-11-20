import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getFontSizeAndWeight } from '@/styles/mixins';

export type FontMenu = 'font' | 'color';

const MENU: { id: FontMenu; label: string }[] = [
  { id: 'font', label: '폰트 선택' },
  { id: 'color', label: '폰트색상선택' },
];

interface FontPaletteProps {
  children: React.ReactNode;
  activeMenu: FontMenu;
  onChangeActiveMenu: (menu: FontMenu) => void;
}

export default function FontPalette({
  children,
  activeMenu,
  onChangeActiveMenu,
}: FontPaletteProps) {
  return (
    <StyledWrapper>
      <StyledMenuList>
        {MENU.map((menu) => (
          <StyledMenuItem
            onClick={() => onChangeActiveMenu(menu.id)}
            key={menu.id}
            isActive={activeMenu === menu.id}
          >
            {menu.label}
          </StyledMenuItem>
        ))}
      </StyledMenuList>
      {children}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const StyledMenuList = styled.div`
  display: flex;
  gap: 8px;
`;
const StyledMenuItem = styled.button<{ isActive: boolean }>`
  flex: 1;
  position: relative;
  ${getFontSizeAndWeight('heading3', 'regular')};
  padding: 16px 0;
  line-height: 20px;
  font-weight: ${({ isActive }) => (isActive ? 700 : 400)};
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors['gray-900'] : theme.colors['gray-600']};

  ${({ isActive, theme }) =>
    isActive &&
    css`
      &:before {
        position: absolute;
        content: '';
        background: ${theme.colors['gray-800']};
        width: 100%;
        height: 1px;
        bottom: 0;
        display: block;
      }
    `}
`;
