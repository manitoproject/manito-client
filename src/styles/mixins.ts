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

export const getFontSizeAndWeight = (
  size: keyof (typeof theme)['fontSize'],
  weight: keyof (typeof theme)['fontWeight'],
) => css`
  font-size: ${theme.fontSize[size]};
  font-weight: ${theme.fontWeight[weight]};
`;
