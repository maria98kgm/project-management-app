import { AuthData, UserData } from '../../../models';
import { getCookieToken } from '../../../share/cookieToken';
import { apiSlice } from '../apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.mutation<UserData[], null>({
      query() {
        return {
          url: 'users',
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
      transformResponse: (result: UserData[]) => result,
    }),
    getUser: build.mutation<UserData, string>({
      query(userId) {
        return {
          url: `users/${userId}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    updateUser: build.mutation<UserData, { userId: string; userInfo: AuthData }>({
      query(data) {
        return {
          url: `users/${data.userId}`,
          method: 'PUT',
          headers: {
            Authorization: getCookieToken(),
          },
          body: data.userInfo,
        };
      },
    }),
    deleteUser: build.mutation<UserData, string>({
      query(userId) {
        return {
          url: `users/${userId}`,
          method: 'DELETE',
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
  }),
});

export const { useGetAllUsersMutation, useGetUserMutation, useDeleteUserMutation } = userApi;
