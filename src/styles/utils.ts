import { css } from '@emotion/react';

import theme from './theme';

export const getFontSizeAndWeight = (
  size: keyof (typeof theme)['fontSize'],
  weight: keyof (typeof theme)['fontWeight'],
) => css`
  font-size: ${theme.fontSize[size]};
  font-weight: ${theme.fontWeight[weight]};
`;
