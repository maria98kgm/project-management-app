import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL_BASE } from '../../../constants';
import { AuthData, UserData } from '../../../models';
import { decodeToken, setCookieToken } from '../../../share/cookieToken';
import { setUser } from '../userSlice';

interface JWTPayload {
  id: string;
  login: string;
  iat: number;
  exp: number;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${URL_BASE}/auth/`,
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<UserData, AuthData>({
      query(data) {
        return {
          url: 'signup',
          method: 'POST',
          body: data,
        };
      },
    }),
    signIn: builder.mutation<string, AuthData>({
      query(data) {
        return {
          url: 'signin',
          method: 'POST',
          body: data,
        };
      },
      transformResponse: (result: { token: string }) => result.token,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const decodedToken: JWTPayload = decodeToken(data);
          const userData: UserData = { login: decodedToken.login, _id: decodedToken.id };
          const tokenExpDate = new Date(decodedToken.exp * 1000);

          dispatch(setUser(userData));
          localStorage.setItem('user', JSON.stringify(userData));
          setCookieToken(data, tokenExpDate.toUTCString());
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
