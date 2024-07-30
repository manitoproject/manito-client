import axios, { CreateAxiosDefaults } from 'axios';

import { token } from '../utils/storage';

const defaultConfig: CreateAxiosDefaults = { baseURL: '/api', timeout: 5000 };

export const requester = axios.create({
  ...defaultConfig,
});

export const RequesterWithoutToken = axios.create({
  ...defaultConfig,
});

requester.interceptors.request.use((config) => {
  if (!token.getAccessToken()) {
    location.href = '/';
    return config;
  }
  config.headers.Authorization = `Bearer ${token.getAccessToken()}`;
  return config;
});
