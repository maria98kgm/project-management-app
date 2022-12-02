import { UpdateUser, UserData, UserName } from '../../../models';
import { getCookieToken } from '../../../share/cookieToken';
import { apiSlice } from '../apiSlice';
import { setAllUsers } from '../userSlice';

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
      transformResponse: (response: UserData[]) => response,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const names: UserName[] = [];
          data.forEach((user) => {
            names.push({
              id: user._id,
              name: user.name,
            });
          });
          dispatch(setAllUsers(names));
        } catch (err) {
          console.error(err);
        }
      },
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
    updateUser: build.mutation<UserData, UpdateUser>({
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

export const {
  useGetAllUsersMutation,
  useUpdateUserMutation,
  useGetUserMutation,
  useDeleteUserMutation,
} = userApi;
