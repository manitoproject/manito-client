import { ColorName, FontNameWithoutAppleGothic } from '../styles/theme';
import { YerOrNo } from './auth';
import { User } from './user';

interface CreateMessageApiParams {
  content: string;
  font: FontNameWithoutAppleGothic;
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
  font: FontNameWithoutAppleGothic;
  fontColor: ColorName;
  isPublic: YerOrNo;
  position: number;
  user: User | null;
}
