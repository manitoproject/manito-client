import {
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
  SpaceCircle,
  SpaceMoon,
  SpacePlanet,
  SpacePlanetCloud,
  SpacePlanetStar,
  SpacePlanetStarRight,
  SpacePlanetStarSquare,
  SpacePlanetStarSquareMoon,
  SpaceSquare,
  SpaceStarBright,
  SpaceTablecloth,
  SpaceTableclothBright,
} from '../assets/svg/emoji';
import { ThemeKey } from './theme-map';

const emojis: { [key in ThemeKey]: { name: string; svg: string }[] } = {
  nature: [
    {
      name: 'NatureCircle1',
      svg: NatureCircle1,
    },
    {
      name: 'NatureCircle2',
      svg: NatureCircle2,
    },
    {
      name: 'NatureCircle3',
      svg: NatureCircle3,
    },
    {
      name: 'NatureCircle4',
      svg: NatureCircle4,
    },
    {
      name: 'NatureClover1',
      svg: NatureClover1,
    },
    {
      name: 'NatureClover2',
      svg: NatureClover2,
    },
    {
      name: 'NatureClover3',
      svg: NatureClover3,
    },
    {
      name: 'NatureClover4',
      svg: NatureClover4,
    },
    {
      name: 'NatureSquare1',
      svg: NatureSquare1,
    },
    {
      name: 'NatureSquare2',
      svg: NatureSquare2,
    },
    {
      name: 'NatureSquare3',
      svg: NatureSquare3,
    },
    {
      name: 'NatureSquare4',
      svg: NatureSquare4,
    },
  ],
  space: [
    {
      name: 'SpaceSquare',
      svg: SpaceSquare,
    },
    {
      name: 'SpacePlanetStarSquareMoon',
      svg: SpacePlanetStarSquareMoon,
    },
    {
      name: 'SpacePlanetStarSquare',
      svg: SpacePlanetStarSquare,
    },
    {
      name: 'SpaceStarBright',
      svg: SpaceStarBright,
    },
    {
      name: 'SpacePlanet',
      svg: SpacePlanet,
    },
    {
      name: 'SpacePlanetCloud',
      svg: SpacePlanetCloud,
    },
    {
      name: 'SpaceCircle',
      svg: SpaceCircle,
    },
    {
      name: 'SpaceMoon',
      svg: SpaceMoon,
    },
    {
      name: 'SpacePlanetStarRight',
      svg: SpacePlanetStarRight,
    },
    {
      name: 'SpacePlanetStar',
      svg: SpacePlanetStar,
    },
    {
      name: 'SpaceTablecloth',
      svg: SpaceTablecloth,
    },
    {
      name: 'SpaceTableclothBright',
      svg: SpaceTableclothBright,
    },
  ],
  office: [],
};

export default emojis;
