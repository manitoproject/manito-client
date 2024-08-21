import { Document, Edit } from '../../../assets/svg/icons';
import { StyledMenu, StyledMenuWrapper } from './page-menu.style';

const TAB = [
  {
    name: '내 컨텐츠',
    svg: Document,
  },
  {
    name: '내 작성물',
    svg: Edit,
  },
];

interface MyContentsTabProps {
  onChangeIndex: React.Dispatch<React.SetStateAction<number>>;
  activeIndex: number;
}

export default function MyContentsTab({
  activeIndex,
  onChangeIndex,
}: MyContentsTabProps) {
  return (
    <StyledMenuWrapper>
      {TAB.map((tab, i) => (
        <StyledMenu
          onClick={() => onChangeIndex(i)}
          isActive={i === activeIndex}
          key={tab.name}
        >
          <tab.svg />
          <span>{tab.name}</span>
        </StyledMenu>
      ))}
    </StyledMenuWrapper>
  );
}
