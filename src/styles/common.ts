import { css } from '@emotion/react';

import theme from './theme';

export const StyledFixedBackground = css`
  position: fixed;
  transform: ${`translateX(-${theme.sizes.padding})`};
  height: ${theme.sizes.calcHeader};
  width: ${theme.sizes.mobile};
  top: ${theme.sizes.header};
  background-size: cover;
  background-repeat: no-repeat;
`;
