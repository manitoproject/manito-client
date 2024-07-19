import axios, { CreateAxiosDefaults } from 'axios';

import { token } from '../utils/storage';

const defaultConfig: CreateAxiosDefaults = { baseURL: '/api' };

export const requester = axios.create({
  ...defaultConfig,
});

export const RequesterWithoutToken = axios.create({
  ...defaultConfig,
});

requester.interceptors.request.use((config) => {
  const { getAccessToken } = token;
  if (!getAccessToken) {
    location.href = '/';
    return config;
  }
  config.headers.Authorization = `Bearer ${getAccessToken}`;
  return config;
});
