import { colors } from '../../../../constants/fonts';
import { ColorName } from '../../../../styles/theme';
import { StyledColorItem, StyledColorList } from './color-list.style';

export interface ColorListProps {
  activeColor: ColorName;
  setActiveColor: React.Dispatch<React.SetStateAction<ColorName>>;
  theme: RollingThemeName;
}

export default function ColorList({
  activeColor,
  setActiveColor,
  theme,
}: ColorListProps) {
  return (
    <StyledColorList>
      {colors[theme].map((color) => (
        <StyledColorItem
          isActive={activeColor === color}
          onClick={() => setActiveColor(color)}
          key={color}
          color={color}
        >
          <div />
        </StyledColorItem>
      ))}
    </StyledColorList>
  );
}
