import { AuthData, UserData } from '../../../models';
import { decodeToken, setCookieToken } from '../../../share/cookieToken';
import { apiSlice } from '../apiSlice';
import { setUser } from '../userSlice';

interface JWTPayload {
  id: string;
  login: string;
  iat: number;
  exp: number;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<UserData, AuthData>({
      query(data) {
        return {
          url: 'auth/signup',
          method: 'POST',
          body: data,
        };
      },
      transformResponse: (result: { data: UserData }) => result.data,
    }),
    signIn: build.mutation<string, AuthData>({
      query(data) {
        return {
          url: 'auth/signin',
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
  overrideExisting: false,
});

export const { useSignUpMutation, useSignInMutation } = authApi;
