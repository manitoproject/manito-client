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
    img: '/src/assets/imgs/bg/space-theme@4x-100.jpg',
  },
  {
    themeKor: '자연',
    themeEng: 'nature',
    img: '/src/assets/imgs/bg/nature-theme@4x-100.jpg',
  },
  {
    themeKor: '멍냥',
    themeEng: 'animal',
    img: '/src/assets/imgs/bg/animal-theme@4x-100.jpg',
  },
];

export default themeList;
