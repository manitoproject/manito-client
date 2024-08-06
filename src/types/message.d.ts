import { ColorName, FontNameWithoutAppleFont } from '../styles/theme';

type Anonymous = string | null;
interface CreateMessageApiParams {
  content: string;
  font: FontNameWithoutAppleFont;
  fontColor: ColorName;
  isPublic: YerOrNo;
  theme: string;
  paperId: number;
  position: number;
  anonymous: Anonymous;
}

interface Message<T> {
  id: number;
  anonymous: Anonymous;
  paperId: number;
  theme: string;
  content: string;
  regDateTime: string;
  font: FontNameWithoutAppleFont;
  fontColor: ColorName;
  isPublic: YerOrNo;
  position: number;
  user: T;
}
