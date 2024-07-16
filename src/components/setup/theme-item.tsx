import { RadioButton, RadioButtonActive } from '../../assets/svg/icons';
import { StyledThemeItem, StyledTitle } from './theme-item.style';

export interface ThemeItemProps {
  isActive: boolean;
  theme: string;
  img: string;
  onClick: () => void;
}

export default function ThemeItem({
  isActive,
  img,
  theme,
  onClick,
}: ThemeItemProps) {
  return (
    <StyledThemeItem onClick={onClick} isActive={isActive}>
      <div>{isActive ? <RadioButtonActive /> : <RadioButton />}</div>
      <StyledTitle isActive={isActive}>{theme}</StyledTitle>
      <div>
        <img src={img} alt={theme} />
      </div>
    </StyledThemeItem>
  );
}
