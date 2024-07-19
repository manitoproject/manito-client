import { Document, Edit } from '../../assets/svg/icons';
import { StyledMenu, StyledMenuWrapper } from './page-menu.style';

const MENU = [
  {
    name: '내 컨텐츠',
    svg: Document,
  },
  {
    name: '내 작성물',
    svg: Edit,
  },
];

interface PageMenuProps {
  onActivePageMenuChange: (i: number) => void;
  activePageMenuIndex: number;
}

export default function PageMenu({
  activePageMenuIndex,
  onActivePageMenuChange,
}: PageMenuProps) {
  return (
    <StyledMenuWrapper>
      {MENU.map((menu, i) => {
        const Svg = menu.svg;
        return (
          <StyledMenu
            onClick={() => onActivePageMenuChange(i)}
            isActive={i === activePageMenuIndex}
            key={menu.name}
          >
            <Svg />
            <span>{menu.name}</span>
          </StyledMenu>
        );
      })}
    </StyledMenuWrapper>
  );
}
