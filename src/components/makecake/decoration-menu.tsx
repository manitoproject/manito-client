import styled from '@emotion/styled';

import {
  CAKE_THEME_STYLES,
  CakeTheme,
  DecorationType,
} from '@/lib/cake-decoration';
import { getFontSizeAndWeight } from '@/styles/mixins';

interface MakeCakeDecorationMenuProps {
  activeTab: DecorationType;
  onChangeActiveTab: (tab: DecorationType) => void;
}

export default function MakeCakeDecorationMenu({
  activeTab,
  onChangeActiveTab,
}: MakeCakeDecorationMenuProps) {
  return (
    <ul>
      {CAKE_THEME_STYLES.map((deco) => (
        <StyledMenu deco={deco} isActive={deco.id === activeTab} key={deco.id}>
          <button onClick={() => onChangeActiveTab(deco.id)}>
            {deco.label}
          </button>
        </StyledMenu>
      ))}
    </ul>
  );
}

const StyledMenu = styled.li<{ isActive: boolean; deco: CakeTheme }>`
  width: 100%;
  button {
    text-align: center;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding: 16px;
    width: 100%;
    background-color: ${({ theme, isActive, deco }) =>
      isActive ? theme.colors[deco.bgColor] : theme.colors.white};
    color: ${({ theme, isActive, deco }) =>
      isActive ? theme.colors[deco.fontColor] : theme.colors['gray-500']};
    ${getFontSizeAndWeight('heading4', 'medium')}
  }
`;
