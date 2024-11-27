import { RadioButton, RadioButtonActive } from '@/assets/svg/icons';
import {
  StyledThemeItem,
  StyledTitle,
} from '@/components/rollingpaper/setup/theme-item.style';

export interface ThemeItemProps {
  isActive: boolean;
  theme: string;
  img: string;
  onChangeActiveTheme: () => void;
}

export default function RollingpaperSetupThemeItem({
  isActive,
  img,
  theme,
  onChangeActiveTheme,
}: ThemeItemProps) {
  return (
    <StyledThemeItem onClick={onChangeActiveTheme} isActive={isActive}>
      <div>{isActive ? <RadioButtonActive /> : <RadioButton />}</div>
      <StyledTitle isActive={isActive}>{theme}</StyledTitle>
      <div>
        <img src={img} alt={theme} />
      </div>
    </StyledThemeItem>
  );
}
