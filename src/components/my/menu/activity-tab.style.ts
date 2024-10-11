import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getFontSizeAndWeight } from '@/styles/mixins';

export const StyledMenuWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
export const StyledMenu = styled.button<{ isActive: boolean }>`
  ${({ isActive, theme }) => css`
    ${getFontSizeAndWeight('heading4', isActive ? 'bold' : 'medium')}
    display: flex;
    padding: 16px 0;
    gap: 4px;
    position: relative;
    justify-content: center;
    align-items: center;
    flex: 1;
    &::after {
      display: ${isActive ? 'auto' : 'none'};
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      bottom: 0;
      border-bottom: 1px solid ${theme.colors['gray-800']};
    }
    svg {
      path {
        stroke: ${isActive
          ? theme.colors['gray-800']
          : theme.colors['gray-500']};
      }
      width: 20px;
      height: 20px;
    }
    span {
      color: ${isActive ? theme.colors['gray-900'] : theme.colors['gray-600']};
    }
  `}
`;
