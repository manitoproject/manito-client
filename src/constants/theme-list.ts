export type ThemeName = 'space' | 'nature' | 'animal';

interface Theme {
  themeKor: '우주' | '자연' | '멍냥';
  themeEng: ThemeName;
  img: string;
}

const THEME_LIST: Theme[] = [
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

export default THEME_LIST;
