import { css } from '@emotion/react';

import theme, { BackgroundColor, ColorNumber, Colors } from '../styles/theme';

export const getFontSizeAndWeight = (
  size: keyof (typeof theme)['fontSize'],
  weight: keyof (typeof theme)['fontWeight'],
) => css`
  font-size: ${theme.fontSize[size]};
  font-weight: ${theme.fontWeight[weight]};
`;

export const getBackgroundColor = (bg?: BackgroundColor) => {
  if (!bg) return theme['colors']['black'];
  const [colorKey, nestedKey] = bg.split('-') as [keyof Colors, ColorNumber];
  if (nestedKey) return theme['colors'][colorKey][nestedKey];
  return theme['colors'][colorKey];
};
