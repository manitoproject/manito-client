import { fonts } from '../../../../constants/fonts';
import { StyledFontItem, StyledFontList } from './font-list.style';

interface FontListProps {
  setActiveFontIndex: React.Dispatch<React.SetStateAction<number>>;
  activeFontIndex: number;
}

export default function FontList({
  setActiveFontIndex,
  activeFontIndex,
}: FontListProps) {
  return (
    <StyledFontList>
      {fonts.map((font, i) => (
        <StyledFontItem
          font={font.name}
          isActive={activeFontIndex === i}
          onClick={() => setActiveFontIndex(i)}
          weight={font.fontWeight}
          key={font.name}
        >
          {font.displayName}
        </StyledFontItem>
      ))}
    </StyledFontList>
  );
}
