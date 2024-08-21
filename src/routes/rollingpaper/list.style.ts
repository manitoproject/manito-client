import { css } from '@emotion/react';
import styled from '@emotion/styled';

import {
  getBackgroundImageFromThemeName,
  StyledFixedBackground,
} from '../../styles/mixins';

export const StyledRollingList = styled.div`
  width: 100%;
`;

export const StyledBackdrop = styled.div<{ themeName?: RollingThemeName }>`
  ${({ themeName }) => css`
    background-image: ${`url(${getBackgroundImageFromThemeName(themeName)})`};
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
