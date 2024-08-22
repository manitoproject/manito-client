import axios, { CreateAxiosDefaults, isAxiosError } from 'axios';

import { token } from '../utils/storage';

const defaultConfig: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
};

export const apiRequester = axios.create({
  ...defaultConfig,
});

export const apiRequesterWithoutToken = axios.create({
  ...defaultConfig,
});

export const discordRequester = axios.create({
  timeout: 5000,
  baseURL: import.meta.env.VITE_DISCORD_WEBHOOK,
});

apiRequester.interceptors.request.use((config) => {
  const accessToken = token.getAccessToken();
  // if (!accessToken) {
  //   window.location.href = '/';
  //   return config;
  // }
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

apiRequester.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;
    if (isAxiosError(error)) {
      if (response.status === 401) {
        const { data } = await axios.post<
          DeatultResponse<Pick<AccessToken, 'accessToken'>>
        >(`${import.meta.env.VITE_BASE_URL}/login/oauth/token/refresh`, {}, {});
        if (data.result === 'Success' && data.data?.accessToken) {
          token.setAccessToken(data.data?.accessToken);
          return apiRequester(config);
        }
        token.removeToken();
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  },
);
