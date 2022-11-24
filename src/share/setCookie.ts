export const setCookie = (token: string) => {
  document.cookie = `Bearer=${token}`;
};
