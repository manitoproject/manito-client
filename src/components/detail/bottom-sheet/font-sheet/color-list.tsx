import styled from '@emotion/styled';

import { ThemeKey } from '../../../../lib/theme-map';

interface ColorListProps {
  setActiveColorIndex: React.Dispatch<React.SetStateAction<number>>;
}

type ColorList = Record<ThemeKey, ''>;
type ColorListType = {};

const colors: {} = {
  space: [
    {
      name: '',
    },
  ],
};

export default function ColorList({ setActiveColorIndex }: ColorListProps) {
  return (
    <StyledColorList>
      {colors.map((color) => (
        <StyledColorItem key={color.name} />
      ))}
    </StyledColorList>
  );
}

const StyledColorList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px 8px;
`;

const StyledColorItem = styled.button<{ color: number }>`
  font-weight: ${({ weight }) => weight};
  font-size: 14px;
  padding: 12px 0;
  line-height: 17px;
`;
