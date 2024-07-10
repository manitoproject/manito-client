import { StyledFontItem, StyledFontList } from './font-list.style';

const FONT_LIST = [
  {
    name: 'Cafe 24',
    fontWeight: 700,
  },
  {
    name: 'Cafe 24 simplehae',
    fontWeight: 400,
  },
  {
    name: 'Galmur11',
    fontWeight: 700,
  },
  {
    name: 'Nanum Pen',
    fontWeight: 400,
  },
  {
    name: 'Pyeong',
    fontWeight: 700,
  },
  {
    name: 'Spoqa',
    fontWeight: 400,
  },
];

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
      {FONT_LIST.map((font, i) => (
        <StyledFontItem
          isActive={activeFontIndex === i}
          onClick={() => setActiveFontIndex(i)}
          weight={font.fontWeight}
          key={font.name}
        >
          {font.name}
        </StyledFontItem>
      ))}
    </StyledFontList>
  );
}
