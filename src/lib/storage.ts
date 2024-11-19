export const accessToken = 'accessToken';

const getAccessToken = () => localStorage.getItem(accessToken);
const setAccessToken = (token: string) =>
  localStorage.setItem(accessToken, token);

const removeToken = () => localStorage.removeItem(accessToken);

export const token = { getAccessToken, setAccessToken, removeToken };
