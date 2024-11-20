import {
  StyledFontItem,
  StyledFontList,
} from '@/components/bottom-sheet/font-sheet/font-list.style';
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
