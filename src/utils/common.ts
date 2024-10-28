import { fonts } from '@/constants/fonts';
import { FontNameWithoutAppleFont } from '@/styles/theme';

export const findFontByName = (name: FontNameWithoutAppleFont) =>
  fonts.find((font) => {
    return font.name === name;
  });
