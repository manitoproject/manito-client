import { fonts } from '../../../../constants/fonts';
import { FontNameWithoutAppleFont } from '../../../../styles/theme';
import { StyledFontItem, StyledFontList } from './font-list.style';

interface FontListProps {
  activeFont: FontNameWithoutAppleFont;
  setActiveFont: React.Dispatch<React.SetStateAction<FontNameWithoutAppleFont>>;
}

export default function FontList({ activeFont, setActiveFont }: FontListProps) {
  return (
    <StyledFontList>
      {fonts.map((font) => (
        <StyledFontItem
          font={font.name}
          isActive={activeFont === font.name}
          onClick={() => setActiveFont(font.name)}
          weight={font.fontWeight}
          key={font.name}
        >
          {font.displayName}
        </StyledFontItem>
      ))}
    </StyledFontList>
  );
}
