import {
  AnimalBgOriginal,
  AnimalBgThumbnail,
  AnimalCatPawsCircleLetter,
  AnimalCatPawsCloverLetter,
  AnimalCatPawsSquareLetter,
  AnimalCatSquareLetter,
  AnimalDogCatCircleLetter,
  AnimalDogCatCloverLetter,
  AnimalDogCatCloverTextLetter,
  AnimalDogCircleLetter,
  AnimalDogPawsCircleLetter,
  AnimalDogPawsCloverLetter,
  AnimalDogPawsSquareLetter,
  AnimalDogSquareLetter,
  NatureBgOriginal,
  NatureBgThumbnail,
  NatureCircle1,
  NatureCircle2,
  NatureCircle3,
  NatureCircle4,
  NatureClover1,
  NatureClover2,
  NatureClover3,
  NatureClover4,
  NatureSquare1,
  NatureSquare2,
  NatureSquare3,
  NatureSquare4,
  SpaceBgOriginal,
  SpaceBgThumbnail,
  SpaceCircle,
  SpaceCircleMoon,
  SpacePlanetCircle,
  SpacePlanetCircleCloud,
  SpacePlanetSquare,
  SpacePlanetSquareMoon,
  SpacePlanetStar,
  SpacePlanetStarRight,
  SpaceSquare,
  SpaceStarBright,
  SpaceTableclothPolygon,
  SpaceTableclothPolygonBright,
} from '@/assets/imgs';
import { ColorName } from '@/styles/theme';
import { Message } from '@/types/message';

const ROLLING_THEME_NAMES: RollingpaperThemeName[] = [
  'nature',
  'space',
  'animal',
];

export const ROLLINGPAPER_BG_MAP: Record<
  RollingpaperThemeName,
  { bgColor: ColorName; bgUrl: string }
> = {
  animal: { bgColor: 'white', bgUrl: AnimalBgOriginal },
  space: { bgColor: 'powderBlue-900', bgUrl: SpaceBgOriginal },
  nature: { bgColor: 'powderBlue-800', bgUrl: NatureBgOriginal },
};

export const getRollingpaperThemeName = (
  message: Message<unknown>,
): RollingpaperThemeName | undefined => {
  const messageTheme = message.theme.toLowerCase();
  return ROLLING_THEME_NAMES.find((name) => messageTheme.includes(name));
};

export const ROLLINGPAPER_THEMES: Theme[] = [
  {
    label: '우주',
    id: 'space',
    img: SpaceBgThumbnail,
  },
  {
    label: '자연',
    id: 'nature',
    img: NatureBgThumbnail,
  },
  {
    label: '멍냥',
    id: 'animal',
    img: AnimalBgThumbnail,
  },
];

export const ROLLINGPAPER_EMOJI_MAP: {
  [key in RollingpaperThemeName]: {
    name: string;
    imgUrl: string;
  }[];
} = {
  nature: [
    {
      name: 'NatureCircle1',
      imgUrl: NatureCircle1,
    },
    {
      name: 'NatureCircle2',
      imgUrl: NatureCircle2,
    },
    {
      name: 'NatureCircle3',
      imgUrl: NatureCircle3,
    },
    {
      name: 'NatureCircle4',
      imgUrl: NatureCircle4,
    },
    {
      name: 'NatureClover1',
      imgUrl: NatureClover1,
    },
    {
      name: 'NatureClover2',
      imgUrl: NatureClover2,
    },
    {
      name: 'NatureClover3',
      imgUrl: NatureClover3,
    },
    {
      name: 'NatureClover4',
      imgUrl: NatureClover4,
    },
    {
      name: 'NatureSquare1',
      imgUrl: NatureSquare1,
    },
    {
      name: 'NatureSquare2',
      imgUrl: NatureSquare2,
    },
    {
      name: 'NatureSquare3',
      imgUrl: NatureSquare3,
    },
    {
      name: 'NatureSquare4',
      imgUrl: NatureSquare4,
    },
  ],
  space: [
    {
      name: 'SpaceSquare',
      imgUrl: SpaceSquare,
    },
    {
      name: 'SpacePlanetSquare',
      imgUrl: SpacePlanetSquare,
    },
    {
      name: 'SpacePlanetSquareMoon',
      imgUrl: SpacePlanetSquareMoon,
    },
    {
      name: 'SpaceStarBright',
      imgUrl: SpaceStarBright,
    },
    {
      name: 'SpacePlanetCircle',
      imgUrl: SpacePlanetCircle,
    },
    {
      name: 'SpacePlanetCircleCloud',
      imgUrl: SpacePlanetCircleCloud,
    },
    {
      name: 'SpaceCircle',
      imgUrl: SpaceCircle,
    },
    {
      name: 'SpaceCircleMoon',
      imgUrl: SpaceCircleMoon,
    },
    {
      name: 'SpacePlanetStarRight',
      imgUrl: SpacePlanetStarRight,
    },
    {
      name: 'SpacePlanetStar',
      imgUrl: SpacePlanetStar,
    },
    {
      name: 'SpaceTableclothPolygon',
      imgUrl: SpaceTableclothPolygon,
    },
    {
      name: 'SpaceTableclothPolygonBright',
      imgUrl: SpaceTableclothPolygonBright,
    },
  ],
  animal: [
    {
      name: 'AnimalDogCircleLetter',
      imgUrl: AnimalDogCircleLetter,
    },
    {
      name: 'AnimalDogCatCircleLetter',
      imgUrl: AnimalDogCatCircleLetter,
    },
    {
      name: 'AnimalDogPawsCircleLetter',
      imgUrl: AnimalDogPawsCircleLetter,
    },
    {
      name: 'AnimalCatPawsCircleLetter',
      imgUrl: AnimalCatPawsCircleLetter,
    },
    {
      name: 'AnimalCatSquareLetter',
      imgUrl: AnimalCatSquareLetter,
    },
    {
      name: 'AnimalDogPawsSquareLetter',
      imgUrl: AnimalDogPawsSquareLetter,
    },
    {
      name: 'AnimalDogSquareLetter',
      imgUrl: AnimalDogSquareLetter,
    },
    {
      name: 'AnimalCatPawsSquareLetter',
      imgUrl: AnimalCatPawsSquareLetter,
    },
    {
      name: 'AnimalCatPawsCloverLetter',
      imgUrl: AnimalCatPawsCloverLetter,
    },
    {
      name: 'AnimalDogPawsCloverLetter',
      imgUrl: AnimalDogPawsCloverLetter,
    },
    {
      name: 'AnimalDogCatCloverLetter',
      imgUrl: AnimalDogCatCloverLetter,
    },
    {
      name: 'AnimalDogCatCloverTextLetter',
      imgUrl: AnimalDogCatCloverTextLetter,
    },
  ],
};
