import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { URL_BASE } from '../../../constants';
import { AuthData, UserData } from '../../../models';
import { getCookieToken } from '../../../share/cookieToken';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${URL_BASE}/users/` }),
  endpoints: (builder) => ({
    getAllUsers: builder.mutation<UserData[], null>({
      query() {
        return {
          url: '',
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    getUser: builder.mutation<UserData, string>({
      query(userId) {
        return {
          url: userId,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    updateUser: builder.mutation<UserData, { userId: string; userInfo: AuthData }>({
      query(data) {
        return {
          url: data.userId,
          method: 'PUT',
          headers: {
            Authorization: getCookieToken(),
          },
          body: data.userInfo,
        };
      },
    }),
    deleteUser: builder.mutation<UserData, string>({
      query(userId) {
        return {
          url: userId,
          method: 'DELETE',
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
  }),
});

export const { useGetAllUsersMutation, useGetUserMutation } = userApi;
