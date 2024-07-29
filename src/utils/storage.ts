export const accessToken = 'accessToken';

const getAccessToken = localStorage.getItem(accessToken);
const setAccessToken = (token: string) =>
  localStorage.setItem(accessToken, token);

export const token = { getAccessToken, setAccessToken };
