import { ColorName, FontNameWithoutAppleFont } from '../styles/theme';

interface CreateMessageApiParams {
  content: string;
  font: FontNameWithoutAppleFont;
  fontColor: ColorName;
  isPublic: YerOrNo;
  theme: string;
  paperId: number;
  position: number;
  anonymous?: string;
}

interface Message {
  id: number;
  anonymous?: string;
  paperId: number;
  theme: string;
  content: string;
  regDateTime: string;
  font: FontNameWithoutAppleFont;
  fontColor: ColorName;
  isPublic: YerOrNo;
  position: number;
  user: User | null;
}
