export const setCookieToken = (token: string): void => {
  document.cookie = `Bearer=${token}`;
};

export const getCookieToken = (): string => {
  return document.cookie.split('=').join(' ');
};
