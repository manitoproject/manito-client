import { ThemeKey } from '../../../../lib/theme-map';
import { ColorKey } from '../../../../styles/theme';
import { StyledColorItem, StyledColorList } from './color-list.style';

export interface ColorListProps {
  setActiveColorIndex: React.Dispatch<React.SetStateAction<number>>;
  theme: ThemeKey;
  activeColorIndex: number;
}

const colors: Record<ThemeKey, Array<ColorKey>> = {
  space: [
    'white',
    'powderBlue-800',
    'powderBlue-900',
    'space-400',
    'space-500',
    'space-600',
    'space-700',
    'black',
  ],
  nature: [
    'white',
    'green-50',
    'olive-700',
    'olive-800',
    'teal-700',
    'teal-800',
    'teal-900',
    'black',
  ],
  office: [],
};

export default function ColorList({
  setActiveColorIndex,
  theme,
  activeColorIndex,
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
