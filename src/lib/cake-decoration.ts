import {
  ChocolateBall,
  ChocolateBearChip,
  ChocolateBearCookie,
  ChocolateBgCake,
  ChocolateBgEmpty,
  ChocolateBgOriginal,
  ChocolateCherryWhippedcream,
  ChocolateChipRollcake,
  ChocolateCircleCookie,
  ChocolateCoatingChocolate,
  ChocolateCookie,
  ChocolateCream,
  ChocolateCreameDount,
  ChocolateFlowerCookie,
  ChocolateMacaroon,
  StrawberryBgCake,
  StrawberryBgEmpty,
  StrawberryBgOriginal,
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
  VanillaBgCake,
  VanillaBgEmpty,
  VanillaBgOriginal,
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
} from '@/assets/imgs';
import { ColorName } from '@/styles/theme';

export type DecorationType = 'chocolate' | 'vanilla' | 'white' | 'strawberry';
export type CakeTheme = {
  id: DecorationType;
  label: string;
  fontColor: ColorName;
  bgColor: ColorName;
};

export const decoPositions: { x: number; y: number }[] = [
  { x: 35, y: 50 },
  { x: 106.33, y: 50 },
  { x: 177.66, y: 50 },
  { x: 248.99, y: 50 },
  { x: 16.5, y: 198 },
  { x: 100.17, y: 198 },
  { x: 183.84, y: 198 },
  { x: 267.51, y: 198 },
  { x: 0, y: 340 },
  { x: 71, y: 340 },
  { x: 142, y: 340 },
  { x: 213, y: 340 },
  { x: 284, y: 340 },
];

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

export const MAKECAKE_EMOJI_MAP: {
  [key in DecorationType]: {
    name: string;
    imgUrl: string;
  }[];
} = {
  chocolate: [
    { name: 'ChocolateCookie', imgUrl: ChocolateCookie },
    { name: 'ChocolateFlowerCookie', imgUrl: ChocolateFlowerCookie },
    { name: 'ChocolateCircleCookie', imgUrl: ChocolateCircleCookie },
    { name: 'ChocolateBearChip', imgUrl: ChocolateBearChip },
    { name: 'ChocolateBearCookie', imgUrl: ChocolateBearCookie },
    { name: 'ChocolateCreameDount', imgUrl: ChocolateCreameDount },
    { name: 'ChocolateCream', imgUrl: ChocolateCream },
    {
      name: 'ChocolateCherryWhippedcream',
      imgUrl: ChocolateCherryWhippedcream,
    },
    { name: 'ChocolateBall', imgUrl: ChocolateBall },
    { name: 'ChocolateMacaroon', imgUrl: ChocolateMacaroon },
    { name: 'ChocolateChipRollcake', imgUrl: ChocolateChipRollcake },
    { name: 'ChocolateCoatingChocolate', imgUrl: ChocolateCoatingChocolate },
  ],
  vanilla: [
    { name: 'VanillaHeartCookie', imgUrl: VanillaHeartCookie },
    { name: 'VanillaFlowerCookie', imgUrl: VanillaFlowerCookie },
    { name: 'VanillaBakingCookie', imgUrl: VanillaBakingCookie },
    { name: 'VanillaRibbon', imgUrl: VanillaRibbon },
    { name: 'VanillaRabbitCookie', imgUrl: VanillaRabbitCookie },
    { name: 'VanillaCreamDount', imgUrl: VanillaCreamDount },
    { name: 'VanillaCream', imgUrl: VanillaCream },
    { name: 'VanillaBlueberryCream', imgUrl: VanillaBlueberryCream },
    { name: 'VanillaChocoball', imgUrl: VanillaChocoball },
    { name: 'VanillaMacaroon', imgUrl: VanillaMacaroon },
    { name: 'VanillaRollCake', imgUrl: VanillaRollCake },
    { name: 'VanillaCoatingChocolate', imgUrl: VanillaCoatingChocolate },
  ],
  strawberry: [
    { name: 'StrawberryHeartCookie', imgUrl: StrawberryHeartCookie },
    { name: 'StrawberryCookie', imgUrl: StrawberryCookie },
    { name: 'StrawberryCatChip', imgUrl: StrawberryCatChip },
    { name: 'StrawberrySyrupIceCream', imgUrl: StrawberrySyrupIceCream },
    { name: 'StrawberryRabbitCookie', imgUrl: StrawberryRabbitCookie },
    { name: 'StrawberryCreamDonut', imgUrl: StrawberryCreamDonut },
    { name: 'StrawberryCream', imgUrl: StrawberryCream },
    { name: 'StrawberryRibbonCream', imgUrl: StrawberryRibbonCream },
    { name: 'StrawberryCoatingChocolate', imgUrl: StrawberryCoatingChocolate },
    { name: 'StrawberryMacaroon', imgUrl: StrawberryMacaroon },
    { name: 'StrawberryRollcake', imgUrl: StrawberryRollcake },
    { name: 'StrawberryCircleChocoball', imgUrl: StrawberryCircleChocoball },
  ],
  white: [
    { name: 'WhiteCreamHeart', imgUrl: WhiteCreamHeart },
    { name: 'WhiteCake', imgUrl: WhiteCake },
    { name: 'WhiteCakeDecoration', imgUrl: WhiteCakeDecoration },
    { name: 'WhiteIceCream', imgUrl: WhiteIceCream },
    { name: 'WhiteBearCookie', imgUrl: WhiteBearCookie },
    { name: 'WhiteCreamDount', imgUrl: WhiteCreamDount },
    { name: 'WhiteCream', imgUrl: WhiteCream },
    { name: 'WhiteFruitCream', imgUrl: WhiteFruitCream },
    { name: 'WhiteChoco', imgUrl: WhiteChoco },
    { name: 'WhiteMacaroon', imgUrl: WhiteMacaroon },
    { name: 'WhiteCreamRollCake', imgUrl: WhiteCreamRollCake },
    { name: 'WhiteCoatingChocolate', imgUrl: WhiteCoatingChocolate },
  ],
};
