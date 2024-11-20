import { fonts } from '@/lib/fonts';
import { FontNameWithoutAppleFont } from '@/styles/theme';

export const findFontByName = (name: FontNameWithoutAppleFont) =>
  fonts.find((font) => {
    return font.name === name;
  });
