import { JWTPayload, SignInData, SignUpData, StateUserInfo, UserData } from '../../../models';
import { decodeToken, setCookieToken } from '../../../share/cookieToken';
import { apiSlice } from '../apiSlice';
import { setUser } from '../userSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<UserData, SignUpData>({
      query(data) {
        return {
          url: 'auth/signup',
          method: 'POST',
          body: data,
        };
      },
      transformResponse: (result: { data: UserData }) => result.data,
    }),
    signIn: build.mutation<string, SignInData>({
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
          const userData: StateUserInfo = { login: decodedToken.login, _id: decodedToken.id };
          const tokenExpDate = new Date(decodedToken.exp * 1000);

          dispatch(setUser(userData));
          setCookieToken(data, tokenExpDate.toUTCString());
        } catch (err) {
          if (err instanceof Error) console.error(err.message);
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useSignUpMutation, useSignInMutation } = authApi;
