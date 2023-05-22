import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { URL_BASE } from '../../constants';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${URL_BASE}/` }),
  endpoints: () => ({}),
});
