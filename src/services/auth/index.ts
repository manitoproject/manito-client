import axios from 'axios';

import { DeatultResponse } from '../../types/axios';

const requester = axios.create({
  // withCredentials: true,
  baseURL: '/api',
});

const getAccessToken = async (code: string | null) => {
  if (!code) return null;
  const { data } = await requester.post<
    DeatultResponse<{ accessToken: string | null }>
  >('/login/oauth/kakao', {
    code,
  });
  return data;
};

const authService = { getAccessToken };

export default authService;
