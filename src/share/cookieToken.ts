import { Buffer } from 'buffer';

export const setCookieToken = (token: string, expDate: string): void => {
  document.cookie = `Bearer=${token}; expires=${expDate}`;
};

export const getCookieToken = (): string => {
  return document.cookie.split('=').join(' ');
};

export const decodeToken = (token: string) => {
  const base64Payload = token.split('.')[1];
  const payloadBuffer = Buffer.from(base64Payload, 'base64');

  return JSON.parse(payloadBuffer.toString());
};

export const checkTokenExp = () => {
  return !document.cookie && localStorage.getItem('user');
};
