import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { URL_BASE } from '../../../constants';
import { UserData } from '../../../models';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${URL_BASE}/users/` }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserData[], null>({
      query: () => '',
    }),
    getUser: builder.query<UserData, string>({
      query: (userId) => userId,
    }),
  }),
});

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { URL_BASE } from '../../../constants';
// import { UserData } from '../../../models';
// import { setUser } from '../userSlice';

// export const userApi = createApi({
//   reducerPath: 'userApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: URL_BASE,
//   }),
//   tagTypes: ['User'],
//   endpoints: (builder) => ({
//     getMe: builder.query<UserData, null>({
//       query() {
//         return {
//           url: 'me',
//           credentials: 'include',
//         };
//       },
//       transformResponse: (result: { data: UserData }) => {
//         console.log(result);
//         return result.data;
//       },
//       async onQueryStarted(args, { dispatch, queryFulfilled }) {
//         try {
//           const { data } = await queryFulfilled;
//           // dispatch(setUser(data));
//           console.log(data);
//         } catch (error) {}
//       },
//     }),
//   }),
// });
