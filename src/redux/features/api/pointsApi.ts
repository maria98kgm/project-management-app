import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { URL_BASE } from '../../../constants';
import { getCookieToken } from '../../../share/cookieToken';

interface PointData {
  _id?: string;
  title: string;
  taskId?: number;
  boardId?: string;
  done: boolean;
}

export const pointApi = createApi({
  reducerPath: 'pointApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${URL_BASE}/` }),
  endpoints: (builder) => ({
    getPointByIdsList: builder.mutation<PointData[], string[]>({
      query(idsList) {
        return {
          url: `points?ids=${idsList}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    getUserPoints: builder.mutation<PointData[], string>({
      query(userId) {
        return {
          url: `points?userId=${userId}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    createPoint: builder.mutation<PointData, PointData>({
      query(data) {
        return {
          url: `points`,
          method: 'POST',
          headers: {
            Authorization: getCookieToken(),
          },
          body: data,
        };
      },
    }),
    updateSetOfPoints: builder.mutation<PointData[], PointData[]>({
      query(points) {
        return {
          url: `points`,
          method: 'PATCH',
          headers: {
            Authorization: getCookieToken(),
          },
          body: points,
        };
      },
    }),
    getTaskPoints: builder.mutation<PointData[], string>({
      query(taskId) {
        return {
          url: `points/${taskId}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    updatePoint: builder.mutation<PointData, { pointId: string; pointInfo: PointData }>({
      query(data) {
        return {
          url: `points/${data.pointId}`,
          method: 'PATCH',
          headers: {
            Authorization: getCookieToken(),
          },
          body: data.pointInfo,
        };
      },
    }),
    deletePoint: builder.mutation<PointData, string>({
      query(pointId) {
        return {
          url: `points/${pointId}`,
          method: 'DELETE',
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
  }),
});

export const {} = pointApi;
