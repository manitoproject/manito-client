import styled from '@emotion/styled';

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
}

export default function FontList({ setActiveFontIndex }: FontListProps) {
  return (
    <StyledFontList>
      {FONT_LIST.map((font, i) => (
        <StyledFontItem
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

const StyledFontList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
`;
const StyledFontItem = styled.button<{ weight: number }>`
  font-weight: ${({ weight }) => weight};
  font-size: 14px;
  padding: 12px 0;
  line-height: 17px;
`;
