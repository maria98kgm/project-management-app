import { PointData } from '../../../models';
import { getCookieToken } from '../../../share/cookieToken';
import { apiSlice } from '../apiSlice';

export const pointApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getPointByIdsList: build.mutation<PointData[], string[]>({
      query(idsList) {
        return {
          url: `points?ids=${idsList}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    getUserPoints: build.mutation<PointData[], string>({
      query(userId) {
        return {
          url: `points?userId=${userId}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    createPoint: build.mutation<PointData, PointData>({
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
    updateSetOfPoints: build.mutation<PointData[], PointData[]>({
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
    getTaskPoints: build.mutation<PointData[], string>({
      query(taskId) {
        return {
          url: `points/${taskId}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    updatePoint: build.mutation<PointData, { pointId: string; pointInfo: PointData }>({
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
    deletePoint: build.mutation<PointData, string>({
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

export const {
  useGetPointByIdsListMutation,
  useGetUserPointsMutation,
  useCreatePointMutation,
  useUpdateSetOfPointsMutation,
  useGetTaskPointsMutation,
  useUpdatePointMutation,
  useDeletePointMutation,
} = pointApi;
