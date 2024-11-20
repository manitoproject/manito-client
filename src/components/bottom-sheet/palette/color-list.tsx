import styled from '@emotion/styled';

import { colors } from '@/lib/fonts';
import { ColorName } from '@/styles/theme';

export interface ColorListProps {
  activeColor: ColorName;
  onChangeColor: (e: React.MouseEvent<HTMLButtonElement>) => void;
  theme: RollingThemeName;
}

export default function ColorList({
  activeColor,
  theme,
  onChangeColor,
}: ColorListProps) {
  return (
    <StyledColorList>
      {colors[theme].map((color) => (
        <StyledColorItem
          name="fontColor"
          value={color}
          isActive={activeColor === color}
          onClick={onChangeColor}
          key={color}
          color={color}
        >
          <div />
        </StyledColorItem>
      ))}
    </StyledColorList>
  );
}

const StyledColorList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px 16px;
`;

const StyledColorItem = styled.button<{
  color: ColorName;
  isActive: boolean;
}>`
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors['powderBlue-100'] : theme.colors.white};
  border-radius: 4px;
  outline: ${({ isActive, theme }) =>
    isActive && `1px dashed ${theme.colors['powderBlue-900']}`};
  padding: 12px;
  div {
    aspect-ratio: 1;
    border: ${({ color, theme }) =>
      color === 'white' && `1px solid ${theme.colors['gray-300']}`};
    border-radius: 50%;
    background-color: ${({ theme, color }) => theme.colors[color]};
  }
`;
