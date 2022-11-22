import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL_BASE } from '../../../constants';
import { AuthData, UserData } from '../../../models';

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
