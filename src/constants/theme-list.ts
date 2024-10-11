import {
  AnimalBgThumbnail,
  NatureBgThumbnail,
  SpaceBgThumbnail,
} from '@/assets/imgs';
import { Message } from '@/types/message';

const ROLLING_THEME_NAME: RollingThemeName[] = ['nature', 'space', 'animal'];

export const getRollingThemeName = (
  message: Message<unknown>,
): RollingThemeName | undefined => {
  const messageTheme = message.theme.toLowerCase();
  return ROLLING_THEME_NAME.find((name) => messageTheme.includes(name));
};

const themeList: Theme[] = [
  {
    themeKor: '우주',
    themeEng: 'space',
    img: SpaceBgThumbnail,
  },
  {
    themeKor: '자연',
    themeEng: 'nature',
    img: NatureBgThumbnail,
  },
  {
    themeKor: '멍냥',
    themeEng: 'animal',
    img: AnimalBgThumbnail,
  },
];

export default themeList;
