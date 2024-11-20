import styled from '@emotion/styled';

import { fonts } from '@/lib/fonts';
import { FontNameWithoutAppleFont } from '@/styles/theme';

interface FontListProps {
  activeFont: FontNameWithoutAppleFont;
  onChangeFont: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function FontList({ activeFont, onChangeFont }: FontListProps) {
  return (
    <StyledFontList>
      {fonts.map((font) => (
        <StyledFontItem
          font={font.name}
          name="font"
          value={font.name}
          isActive={activeFont === font.name}
          onClick={onChangeFont}
          weight={font.fontWeight}
          key={font.name}
        >
          {font.displayName}
        </StyledFontItem>
      ))}
    </StyledFontList>
  );
}

const StyledFontList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px 4px;
`;
const StyledFontItem = styled.button<{
  weight: number;
  isActive: boolean;
  font: string;
}>`
  color: ${({ theme }) => theme.colors['gray-800']};
  font-family: ${({ font }) => font};
  border-radius: 4px;
  font-weight: ${({ weight }) => weight};
  font-size: 14px;
  height: 96px;
  padding: 12px 0;
  line-height: 17px;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors['powderBlue-100'] : theme.colors.white};
  outline: ${({ isActive, theme }) =>
    isActive && `1px dashed ${theme.colors['powderBlue-900']}`};
`;
