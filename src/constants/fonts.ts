import { FontName, FontNameWithoutAppleGothic } from '../styles/theme';

export type Font = {
  name: FontName;
  fontWeight: number;
  displayName: string;
};

export type ThemeColor<K extends keyof typeof COLORS> =
  (typeof COLORS)[K][number];

const COLORS = {
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
} as const;

const FONTS: Record<FontNameWithoutAppleGothic, Font> = {
  Cafe24Ssurround: {
    name: 'Cafe24Ssurround',
    fontWeight: 700,
    displayName: 'cafe 24',
  },
  Cafe24Simplehae: {
    name: 'Cafe24Simplehae',
    fontWeight: 400,
    displayName: 'Cafe 24 simple',
  },
  Galmuri11: {
    name: 'Galmuri11',
    fontWeight: 700,
    displayName: 'Galmuri11',
  },
  SpoqaHanSansNeo: {
    name: 'SpoqaHanSansNeo',
    fontWeight: 700,
    displayName: 'spoqa Sans',
  },
  NanumPen: {
    name: 'NanumPen',
    fontWeight: 400,
    displayName: 'Nanum Pen',
  },
  PyeongChangPeace: {
    name: 'PyeongChangPeace',
    fontWeight: 700,
    displayName: 'Pyeong',
  },
};

export { COLORS, FONTS };
