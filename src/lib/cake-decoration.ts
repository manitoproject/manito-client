import { FunctionComponent, SVGAttributes } from 'react';

import {
  ChocolateBgCake,
  ChocolateBgEmpty,
  ChocolateBgOriginal,
  StrawberryBgCake,
  StrawberryBgEmpty,
  StrawberryBgOriginal,
  VanillaBgCake,
  VanillaBgEmpty,
  VanillaBgOriginal,
} from '@/assets/imgs';
import {
  ChocolateBall,
  ChocolateBearChip,
  ChocolateBearCookie,
  ChocolateCherryWhippedcream,
  ChocolateChipRollcake,
  ChocolateCircleCookie,
  ChocolateCoatingChocolate,
  ChocolateCookie,
  ChocolateCream,
  ChocolateCreameDount,
  ChocolateFlowerCookie,
  ChocolateMacaroon,
  StrawberryCatChip,
  StrawberryCircleChocoball,
  StrawberryCoatingChocolate,
  StrawberryCookie,
  StrawberryCream,
  StrawberryCreamDonut,
  StrawberryHeartCookie,
  StrawberryMacaroon,
  StrawberryRabbitCookie,
  StrawberryRibbonCream,
  StrawberryRollcake,
  StrawberrySyrupIceCream,
  VanillaBakingCookie,
  VanillaBlueberryCream,
  VanillaChocoball,
  VanillaCoatingChocolate,
  VanillaCream,
  VanillaCreamDount,
  VanillaFlowerCookie,
  VanillaHeartCookie,
  VanillaMacaroon,
  VanillaRabbitCookie,
  VanillaRibbon,
  VanillaRollCake,
  WhiteBearCookie,
  WhiteCake,
  WhiteCakeDecoration,
  WhiteChoco,
  WhiteCoatingChocolate,
  WhiteCream,
  WhiteCreamDount,
  WhiteCreamHeart,
  WhiteCreamRollCake,
  WhiteFruitCream,
  WhiteIceCream,
  WhiteMacaroon,
} from '@/assets/svg/decorations';
import { ROLLINGPAPER_EMOJI_MAP } from '@/lib/rolling-paper';
import { TREASURES } from '@/lib/treasure-box';
import { ColorName } from '@/styles/theme';

export type DecorationType = 'chocolate' | 'vanilla' | 'white' | 'strawberry';
export type CakeTheme = {
  id: DecorationType;
  label: string;
  fontColor: ColorName;
  bgColor: ColorName;
};
export const findSvgByThemeName = (name: string) => {
  const all = [
    ...CAKE_DECORATIONS.chocolate,
    ...CAKE_DECORATIONS.strawberry,
    ...CAKE_DECORATIONS.vanilla,
    ...CAKE_DECORATIONS.white,
    ...ROLLINGPAPER_EMOJI_MAP.animal,
    ...ROLLINGPAPER_EMOJI_MAP.nature,
    ...ROLLINGPAPER_EMOJI_MAP.space,
    ...TREASURES,
  ];
  return all.find((item) => item.name === name)?.svg;
};

export const findBgByPosition = (position: number) => {
  if (position <= 13) {
    return CAKE_THEME_PALETTES[0].bgUrl;
  } else if (position <= 26) {
    return CAKE_THEME_PALETTES[1].bgUrl;
  }
  return CAKE_THEME_PALETTES[2].bgUrl;
};

export const findCakeThemeStyle = (thmeName: string) => {
  return CAKE_THEME_STYLES.find((theme) =>
    thmeName.toLowerCase().includes(theme.id),
  );
};
export const CAKE_THEME_PALETTES: Array<{
  btnColor: string;
  bgUrl: string;
  cakeUrl: string;
  emptyBgUrl: string;
  headerColor: ColorName;
}> = [
  {
    btnColor: '#F9BBC8',
    bgUrl: StrawberryBgOriginal,
    cakeUrl: StrawberryBgCake,
    emptyBgUrl: StrawberryBgEmpty,
    headerColor: 'pink-300',
  },
  {
    btnColor: '#74342A',
    bgUrl: ChocolateBgOriginal,
    cakeUrl: ChocolateBgCake,
    emptyBgUrl: ChocolateBgEmpty,
    headerColor: 'chocolate-300',
  },
  {
    btnColor: '#FE7D3F',
    bgUrl: VanillaBgOriginal,
    cakeUrl: VanillaBgCake,
    emptyBgUrl: VanillaBgEmpty,
    headerColor: 'vanilla-300',
  },
];

export const CAKE_THEME_STYLES: CakeTheme[] = [
  {
    id: 'chocolate',
    label: '초코',
    fontColor: 'chocolate-300',
    bgColor: 'chocolate-100',
  },
  {
    id: 'vanilla',
    label: '바닐라',
    fontColor: 'vanilla-300',
    bgColor: 'vanilla-100',
  },
  {
    id: 'strawberry',
    label: '딸기',
    fontColor: 'pink-300',
    bgColor: 'pink-100',
  },
  {
    id: 'white',
    label: '화이트',
    fontColor: 'gray-800',
    bgColor: 'gray-100',
  },
];

export const CAKE_DECORATIONS: {
  [key in DecorationType]: {
    name: string;
    svg: FunctionComponent<SVGAttributes<SVGElement>>;
  }[];
} = {
  chocolate: [
    { name: 'ChocolateCookie', svg: ChocolateCookie },
    { name: 'ChocolateFlowerCookie', svg: ChocolateFlowerCookie },
    { name: 'ChocolateCircleCookie', svg: ChocolateCircleCookie },
    { name: 'ChocolateBearChip', svg: ChocolateBearChip },
    { name: 'ChocolateBearCookie', svg: ChocolateBearCookie },
    { name: 'ChocolateCreameDount', svg: ChocolateCreameDount },
    { name: 'ChocolateCream', svg: ChocolateCream },
    { name: 'ChocolateCherryWhippedcream', svg: ChocolateCherryWhippedcream },
    { name: 'ChocolateBall', svg: ChocolateBall },
    { name: 'ChocolateMacaroon', svg: ChocolateMacaroon },
    { name: 'ChocolateChipRollcake', svg: ChocolateChipRollcake },
    { name: 'ChocolateCoatingChocolate', svg: ChocolateCoatingChocolate },
  ],
  vanilla: [
    { name: 'VanillaHeartCookie', svg: VanillaHeartCookie },
    { name: 'VanillaFlowerCookie', svg: VanillaFlowerCookie },
    { name: 'VanillaBakingCookie', svg: VanillaBakingCookie },
    { name: 'VanillaRibbon', svg: VanillaRibbon },
    { name: 'VanillaRabbitCookie', svg: VanillaRabbitCookie },
    { name: 'VanillaCreamDount', svg: VanillaCreamDount },
    { name: 'VanillaCream', svg: VanillaCream },
    { name: 'VanillaBlueberryCream', svg: VanillaBlueberryCream },
    { name: 'VanillaChocoball', svg: VanillaChocoball },
    { name: 'VanillaMacaroon', svg: VanillaMacaroon },
    { name: 'VanillaRollCake', svg: VanillaRollCake },
    { name: 'VanillaCoatingChocolate', svg: VanillaCoatingChocolate },
  ],
  strawberry: [
    { name: 'StrawberryHeartCookie', svg: StrawberryHeartCookie },
    { name: 'StrawberryCookie', svg: StrawberryCookie },
    { name: 'StrawberryCatChip', svg: StrawberryCatChip },
    { name: 'StrawberrySyrupIceCream', svg: StrawberrySyrupIceCream },
    { name: 'StrawberryRabbitCookie', svg: StrawberryRabbitCookie },
    { name: 'StrawberryCreamDonut', svg: StrawberryCreamDonut },
    { name: 'StrawberryCream', svg: StrawberryCream },
    { name: 'StrawberryRibbonCream', svg: StrawberryRibbonCream },
    { name: 'StrawberryCoatingChocolate', svg: StrawberryCoatingChocolate },
    { name: 'StrawberryMacaroon', svg: StrawberryMacaroon },
    { name: 'StrawberryRollcake', svg: StrawberryRollcake },
    { name: 'StrawberryCircleChocoball', svg: StrawberryCircleChocoball },
  ],
  white: [
    { name: 'WhiteCreamHeart', svg: WhiteCreamHeart },
    { name: 'WhiteCake', svg: WhiteCake },
    { name: 'WhiteCakeDecoration', svg: WhiteCakeDecoration },
    { name: 'WhiteIceCream', svg: WhiteIceCream },
    { name: 'WhiteBearCookie', svg: WhiteBearCookie },
    { name: 'WhiteCreamDount', svg: WhiteCreamDount },
    { name: 'WhiteCream', svg: WhiteCream },
    { name: 'WhiteFruitCream', svg: WhiteFruitCream },
    { name: 'WhiteChoco', svg: WhiteChoco },
    { name: 'WhiteMacaroon', svg: WhiteMacaroon },
    { name: 'WhiteCreamRollCake', svg: WhiteCreamRollCake },
    { name: 'WhiteCoatingChocolate', svg: WhiteCoatingChocolate },
  ],
};
