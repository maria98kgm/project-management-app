export interface JWTPayload {
  id: string;
  login: string;
  iat: number;
  exp: number;
}
