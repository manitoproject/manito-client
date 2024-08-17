import { css } from '@emotion/react';
import styled from '@emotion/styled';

import {
  RadioButton as RadioButtonSvg,
  RadioButtonActive,
} from '../../../assets/svg/icons';
import { getFontSizeAndWeight } from '../../../styles/mixins';

interface RadioButtonProps {
  children: React.ReactNode;
  isActive: boolean;
  onChangeIndex: () => void;
}

export default function RadioButton({
  children,
  isActive,
  onChangeIndex,
}: RadioButtonProps) {
  return (
    <StyledRadioButton
      isActive={isActive}
      type="button"
      onClick={onChangeIndex}
    >
      {isActive ? <RadioButtonActive /> : <RadioButtonSvg />}
      {children}
    </StyledRadioButton>
  );
}

const StyledRadioButton = styled.button<Pick<RadioButtonProps, 'isActive'>>`
  ${({ isActive, theme }) => {
    return css`
      padding: 12px 0;
      display: flex;
      align-items: center;
      gap: 8px;
      span {
        color: ${theme.colors['gray-500']};
        ${getFontSizeAndWeight('heading4', 'regular')}
      }
      p {
        color: ${theme.colors[isActive ? 'gray-900' : 'gray-500']};
        ${getFontSizeAndWeight('heading2', isActive ? 'bold' : 'regular')}
      }
    `;
  }}
`;
