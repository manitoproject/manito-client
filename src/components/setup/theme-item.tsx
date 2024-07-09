import styled from '@emotion/styled';

import { RadioButton, RadioButtonActive } from '../../assets/svg';

interface ThemeItemProps {
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
      <div>
        <img src={img} alt={theme} />
      </div>
      <StyledTitle isActive={isActive}>{theme}</StyledTitle>
    </StyledThemeItem>
  );
}
const StyledThemeItem = styled.div<{ isActive: boolean }>`
  cursor: pointer;
  padding: 16px;
  user-select: none;
  display: flex;
  width: 148px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  background-color: ${(props) =>
    props.isActive
      ? props.theme.colors.powderBlue[50]
      : props.theme.colors.white};
  border: 1px solid
    ${({ isActive, theme }) =>
      isActive ? theme.colors.powderBlue[900] : theme.colors.gray[300]};
  border-radius: 8px;
  div {
    width: 100%;
    img {
      width: 100%;
      border-radius: 4px;
      height: 224px;
    }
    display: flex;
    justify-content: center;
  }
`;

const StyledTitle = styled.div<{ isActive: boolean }>`
  font-weight: ${(props) => (props.isActive ? 700 : 500)};
  width: 100%;
  color: ${(props) =>
    props.isActive
      ? props.theme.colors.powderBlue[900]
      : props.theme.colors.gray[600]};
  padding: 6px 0;
  border: 1px solid ${(props) => props.theme.colors.gray[300]};
  border-radius: 99px;
  background-color: ${(props) => props.theme.colors.white};
`;
