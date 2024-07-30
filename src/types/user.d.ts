import { YerOrNo } from './auth';

export interface User {
  email: string;
  id: number;
  nickname: string;
  originName: string;
  provider: string;
  regDate: string;
  profileImage: string;
  isOriginProfile: null | YerOrNo;
}
