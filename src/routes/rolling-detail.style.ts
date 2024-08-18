import { css } from '@emotion/react';
import styled from '@emotion/styled';

import {
  getBackgroundImageFromThemeName,
  StyledFixedBackground,
} from '../styles/mixins';

export const StyledRollingDetail = styled.div`
  width: 100%;
`;

export const StyledBackdrop = styled.div<{ themeName?: RollingThemeName }>`
  ${({ themeName }) => css`
    background-image: ${`url(${getBackgroundImageFromThemeName(themeName)})`};
    ${StyledFixedBackground};
  `}
`;
