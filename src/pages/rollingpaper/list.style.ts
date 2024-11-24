import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getFontSizeAndWeight, StyledFixedBackground } from '@/styles/mixins';

export const StyledListWrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const StyledBackdrop = styled.div<{ bg: string }>`
  ${({ bg }) => css`
    background-image: ${`url(${bg})`};
    ${StyledFixedBackground};
  `}
`;

export const StyledMessageTotal = styled.p`
  ${getFontSizeAndWeight('heading4', 'medium')}
  color: ${({ theme }) => theme.colors['gray-800']};
  span {
    color: ${({ theme }) => theme.colors['gray-900']};
    ${getFontSizeAndWeight('heading4', 'bold')}
  }
`;
