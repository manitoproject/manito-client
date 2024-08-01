import { colors } from '../../../constants/fonts';
import { ThemeName } from '../../../constants/theme-list';
import { StyledColorItem, StyledColorList } from './color-list.style';

export interface ColorListProps {
  setActiveColorIndex: React.Dispatch<React.SetStateAction<number>>;
  activeColorIndex: number;
  theme: ThemeName;
}

export default function ColorList({
  setActiveColorIndex,
  activeColorIndex,
  theme,
}: ColorListProps) {
  return (
    <StyledColorList>
      {colors[theme].map((color, i) => (
        <StyledColorItem
          isActive={activeColorIndex === i}
          onClick={() => setActiveColorIndex(i)}
          key={color}
          color={color}
        >
          <div />
        </StyledColorItem>
      ))}
    </StyledColorList>
  );
}
