import { Document, Edit } from '../../../assets/svg/icons';
import { StyledMenu, StyledMenuWrapper } from './activity-tab.style';

const tab = [
  {
    name: '내 컨텐츠',
    svg: Document,
  },
  {
    name: '내 작성물',
    svg: Edit,
  },
];

interface MyActivityTabProps {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  activeIndex: number;
  resetCategoryTab: () => void;
}

export default function MyActivityTab({
  activeIndex,
  setActiveIndex,
  resetCategoryTab,
}: MyActivityTabProps) {
  return (
    <StyledMenuWrapper>
      {tab.map((tab, i) => (
        <StyledMenu
          onClick={() => {
            setActiveIndex(i);
            resetCategoryTab();
          }}
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
