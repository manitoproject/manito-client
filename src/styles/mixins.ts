import { css } from '@emotion/react';

import animalBg from '../assets/imgs/bg/animal-theme@4x-100.jpg';
import natureBg from '../assets/imgs/bg/nature-theme@4x-100.jpg';
import spaceBg from '../assets/imgs/bg/space-theme@4x-100.jpg';
import { EmojiType } from '../components/rollingpaper/emoji-skin';
import theme from './theme';

export const getBackgroundImageFromThemeName = (
  thmeName?: RollingThemeName,
) => {
  return [animalBg, natureBg, spaceBg].find((bg) =>
    bg.includes(thmeName ?? ''),
  );
};

export const StyledFixedBackground = css`
  position: fixed;
  transform: ${`translateX(-${theme.sizes.padding})`};
  height: ${theme.sizes.calcHeader};
  top: ${theme.sizes.header};
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  width: ${theme.sizes.mobile};
  @media (max-width: 480px) {
    width: 100vw;
  }
`;

export const getFontSizeAndWeight = (
  size: keyof (typeof theme)['fontSize'],
  weight: keyof (typeof theme)['fontWeight'],
) => css`
  font-size: ${theme.fontSize[size]};
  font-weight: ${theme.fontWeight[weight]};
`;

export const getTextareaSize = (type?: EmojiType, isMini?: boolean) => {
  let width = '';
  let height = '';
  let top = '';
  let translate = '';
  if (type === 'Circle') {
    if (isMini) {
      width = '57.7%';
      height = '53.8%';
    } else {
      width = '55.5%';
      height = '55.5%';
    }
    top = '50%';
    translate = '-50%,-50%';
  } else if (type === 'Square') {
    if (isMini) {
      width = '73.1%';
      height = '61.5%';
    } else {
      width = '64.8%';
      height = '64.8%';
    }
    top = '50%';
    translate = '-50%,-50%';
  } else {
    if (isMini) {
      if (type === 'Clover') {
        width = '48.6%';
        height = '46.3%';
        top = '50%';
        translate = '-50%,-50%';
      } else if (type === 'Polygon') {
        width = '53.8%';
        height = '48.1%';
        top = '50%';
        translate = '-50%,-50%';
      } else {
        width = '47.1%';
        height = '47.1%';
        translate = '-50%';
        top = '34.6%';
      }
    } else {
      top = '32.4%';
      translate = '-50%';
      width = '48.6%';
      height = '46.3%';
    }
  }

  return css`
    transform: ${`translate(${translate})`};
    top: ${top};
    width: ${width};
    height: ${height};
  `;
};
