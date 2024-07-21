import { StyledPaper, StyledPaperWrapper } from './paper-menu.style';

const PAPERS: { name: PaperType }[] = [
  {
    name: '롤링페이퍼',
  },
  {
    name: '보물찾기',
  },
  {
    name: '케이크 꾸미기',
  },
];

interface PaperMenuProps {
  onActivePaperMenuChange: (i: number) => void;
  onActivePaperMenuIndex: number;
}

export default function PaperMenu({
  onActivePaperMenuChange,
  onActivePaperMenuIndex,
}: PaperMenuProps) {
  return (
    <StyledPaperWrapper>
      {PAPERS.map((paper, i) => (
        <StyledPaper
          onClick={() => onActivePaperMenuChange(i)}
          isActive={i === onActivePaperMenuIndex}
          key={paper.name}
        >
          {paper.name}
        </StyledPaper>
      ))}
    </StyledPaperWrapper>
  );
}
