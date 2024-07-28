import { ColorKey, FontKey } from '../styles/theme';
import { User } from './user';

interface CreateMessageApiParams {
  content: string;
  font: FontKey;
  fontColor: ColorKey;
  isPublic: 'Y' | 'N';
  theme: string;
  paperId: number;
  position: number;
}

interface Message {
  id: number;
  paperId: number;
  user: User;
  theme: string;
  content: string;
  regDateTime: string;
  font: FontKey;
  fontColor: ColorKey;
  isPublic: string;
  position: number;
}
