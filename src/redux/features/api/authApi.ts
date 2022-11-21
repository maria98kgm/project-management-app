import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL_BASE } from '../../../constants';
import { AuthData, UserData } from '../../../models';
import { setUser } from '../userSlice';

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
      transformResponse: (result: { data: UserData }) => result.data,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (err) {
          console.error(err);
        }
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
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
