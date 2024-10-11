import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { StyledFixedBackground } from '@/styles/mixins';

export const StyledRollingList = styled.div`
  width: 100%;
  position: relative;
`;

export const StyledBackdrop = styled.div<{ bg: string }>`
  ${({ bg }) => css`
    background-image: ${`url(${bg})`};
    ${StyledFixedBackground};
  `}
`;

export const StyledListWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 28px;
  z-index: 50;
`;
