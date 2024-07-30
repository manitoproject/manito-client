type YerOrNo = 'N' | 'Y';

export interface AccessToken {
  isNewUser: YerOrNo;
  accessToken: string;
}
