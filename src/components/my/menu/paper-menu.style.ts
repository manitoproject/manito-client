import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getFontSizeAndWeight } from '../../../styles/mixins';

export const StyledPaperWrapper = styled.div`
  padding: 8px 16px;
  display: flex;
  gap: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors['gray-100']};
`;
export const StyledPaper = styled.button<{ isActive: boolean }>`
  border-radius: 4px;
  ${getFontSizeAndWeight('heading4', 'regular')}
  padding: 12px 16px;
  flex: 1;
  ${({ theme, isActive }) => css`
    background-color: ${isActive
      ? theme.colors['powderBlue-900']
      : theme.colors['gray-100']};
    color: ${isActive ? theme.colors.white : theme.colors['gray-500']};
  `}
`;
