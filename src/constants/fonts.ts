import { ColorKey, FontKey } from '../styles/theme';
import { ThemeKey } from './theme-list';

export type Font = {
  name: FontKey;
  fontWeight: number;
  displayName: string;
};

const colors: Record<ThemeKey, Array<ColorKey>> = {
  space: [
    'white',
    'powderBlue-800',
    'powderBlue-900',
    'space-400',
    'space-500',
    'space-600',
    'space-700',
    'black',
  ],
  nature: [
    'white',
    'green-50',
    'olive-700',
    'olive-800',
    'teal-700',
    'teal-800',
    'teal-900',
    'black',
  ],
  animal: [
    'white',
    'animal-orange-100',
    'animal-orange-200',
    'animal-red-brown-100',
    'animal-red-brown-200',
    'animal-brown-100',
    'animal-gray-800',
    'black',
  ],
};

const fonts: Font[] = [
  {
    name: 'Cafe24Ssurround',
    fontWeight: 700,
    displayName: 'cafe 24',
  },
  {
    name: 'Cafe24Simplehae',
    fontWeight: 400,
    displayName: 'Cafe 24 simple',
  },
  {
    name: 'Galmuri11',
    fontWeight: 700,
    displayName: 'Galmuri11',
  },
  {
    name: 'SpoqaHanSansNeo',
    fontWeight: 700,
    displayName: 'spoqa Sans',
  },
  {
    name: 'NanumPen',
    fontWeight: 400,
    displayName: 'Nanum Pen',
  },
  {
    name: 'PyeongChangPeace',
    fontWeight: 700,
    displayName: 'Pyeong',
  },
];

export { colors, fonts };
