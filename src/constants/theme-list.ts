import animalBg from '../assets/imgs/bg/animal-theme4x-100.webp';
import natureBg from '../assets/imgs/bg/nature-theme4x-100.webp';
import spaceBg from '../assets/imgs/bg/space-theme4x-100.webp';
import { Message } from '../types/message';

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
    img: spaceBg,
  },
  {
    themeKor: '자연',
    themeEng: 'nature',
    img: natureBg,
  },
  {
    themeKor: '멍냥',
    themeEng: 'animal',
    img: animalBg,
  },
];

export default themeList;
