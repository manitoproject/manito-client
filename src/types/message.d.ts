import { ColorKey, FontKey } from '../styles/theme';

interface CreateMessageApiParams {
  content: string;
  font: FontKey;
  fontColor: ColorKey;
  isPublic: 'Y' | 'N';
  theme: string;
  paperId: number;
}

interface Message {
  id: number;
  paperId: number;
  userId: number;
  theme: string;
  content: string;
  regDateTime: string;
  font: FontKey;
  fontColor: ColorKey;
}
