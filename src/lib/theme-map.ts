export type ThemeKey = 'space' | 'nature' | 'office';

interface Theme {
  themeKor: '우주' | '자연' | '회사';
  themeEng: ThemeKey;
  img: string;
}

const themeList: Theme[] = [
  {
    themeKor: '우주',
    themeEng: 'space',
    img: '/src/assets/imgs/bg/space.png',
  },
  {
    themeKor: '자연',
    themeEng: 'nature',
    img: '/src/assets/imgs/bg/nature.png',
  },
  {
    themeKor: '회사',
    themeEng: 'office',
    img: '/src/assets/imgs/bg/space.png',
  },
];

export default themeList;
