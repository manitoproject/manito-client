import { MAKECAKE_EMOJI_MAP } from '@/lib/cake-decoration';
import { fonts } from '@/lib/fonts';
import { ROLLINGPAPER_EMOJI_MAP } from '@/lib/rolling-paper';
import { TREASURESBOX_EMOJI_MAP } from '@/lib/treasure-box';
import { FontNameWithoutAppleFont } from '@/styles/theme';

export const findFontByName = (name: FontNameWithoutAppleFont) =>
  fonts.find((font) => {
    return font.name === name;
  });

export const findImgByThemeName = (name: string) => {
  const all = [
    ...ROLLINGPAPER_EMOJI_MAP.animal,
    ...ROLLINGPAPER_EMOJI_MAP.nature,
    ...ROLLINGPAPER_EMOJI_MAP.space,
    ...MAKECAKE_EMOJI_MAP.chocolate,
    ...MAKECAKE_EMOJI_MAP.strawberry,
    ...MAKECAKE_EMOJI_MAP.vanilla,
    ...MAKECAKE_EMOJI_MAP.white,
    ...TREASURESBOX_EMOJI_MAP,
  ];
  return all.find((item) => item.name === name)?.imgUrl;
};
