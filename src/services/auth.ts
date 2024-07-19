import { AccessToken } from '../types/auth';
import { DeatultResponse } from '../types/axios';
import { User } from '../types/user';
import { RequesterWithoutToken } from '.';

export const getAccessToken = async (code: string | null) => {
  if (!code) return null;
  const { data } = await RequesterWithoutToken.post<
    DeatultResponse<AccessToken & User>
  >('/login/oauth/kakao', {
    code,
  });
  return data;
};
