import { FontKey } from '../../../../styles/theme';
import { StyledFontItem, StyledFontList } from './font-list.style';

const FONT_LIST: { name: FontKey; fontWeight: number; displayName: string }[] =
  [
    {
      name: 'Cafe24Ssurround',
      fontWeight: 700,
      displayName: 'cafe 24',
    },
    {
      name: 'Cafe24Simplehae',
      fontWeight: 400,
      displayName: 'Cafe 24 simple',
    },
    {
      name: 'Galmuri11',
      fontWeight: 700,
      displayName: 'Galmuri11',
    },
    {
      name: 'SpoqaHanSansNeo',
      fontWeight: 700,
      displayName: 'spoqa Sans',
    },
    {
      name: 'NanumPen',
      fontWeight: 400,
      displayName: 'Nanum Pen',
    },
    {
      name: 'PyeongChangPeace',
      fontWeight: 700,
      displayName: 'Pyeong',
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
