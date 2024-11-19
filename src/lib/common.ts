import { FontNameWithoutAppleFont } from '@/styles/theme';
import { fonts } from '@/lib/fonts';

export const findFontByName = (name: FontNameWithoutAppleFont) =>
  fonts.find((font) => {
    return font.name === name;
  });
