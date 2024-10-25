import { FunctionComponent, SVGAttributes } from 'react';

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

export type DecorationType = 'chocolate' | 'vanilla' | 'white' | 'strawberry';

export const getDecorationSvg = (deco: string) => {
  const all = [
    ...DECORATIONS.chocolate,
    ...DECORATIONS.strawberry,
    ...DECORATIONS.vanilla,
    ...DECORATIONS.white,
  ];
  const foundDeco = all.find((item) => item.name === deco)?.svg;
  return foundDeco || all[0].svg;
};

export const DECORATIONS: {
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
