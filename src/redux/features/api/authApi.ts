import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL_BASE } from '../../../constants';
import { AuthData, UserData } from '../../../models';
import { setToken, setUser } from '../userSlice';

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
    signIn: builder.mutation<{ token: string }, AuthData>({
      query(data) {
        return {
          url: 'signin',
          method: 'POST',
          body: data,
        };
      },
      transformResponse: (result: { data: { token: string } }) => result.data,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data.token));
          // console.log(data, args);
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
