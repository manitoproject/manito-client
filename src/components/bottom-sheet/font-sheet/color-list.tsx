import {
  StyledColorItem,
  StyledColorList,
} from '@/components/bottom-sheet/font-sheet/color-list.style';
import { colors } from '@/lib/fonts';
import { ColorName } from '@/styles/theme';

export interface ColorListProps {
  activeColor: ColorName;
  onChangeColor: (e: React.MouseEvent<HTMLButtonElement>) => void;
  theme: RollingThemeName;
}

export default function ColorList({
  activeColor,
  theme,
  onChangeColor,
}: ColorListProps) {
  return (
    <StyledColorList>
      {colors[theme].map((color) => (
        <StyledColorItem
          name="fontColor"
          value={color}
          isActive={activeColor === color}
          onClick={onChangeColor}
          key={color}
          color={color}
        >
          <div />
        </StyledColorItem>
      ))}
    </StyledColorList>
  );
}
