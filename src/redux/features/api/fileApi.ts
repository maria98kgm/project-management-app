import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { URL_BASE } from '../../../constants';
import { FileData } from '../../../models';
import { getCookieToken } from '../../../share/cookieToken';

export const fileApi = createApi({
  reducerPath: 'fileApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${URL_BASE}/` }),
  endpoints: (builder) => ({
    getFilesByIdsList: builder.mutation<FileData[], string[]>({
      query(idsList) {
        return {
          url: `file?ids=${idsList}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    getUserFiles: builder.mutation<FileData[], string>({
      query(userId) {
        return {
          url: `file?userId=${userId}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    getTaskFiles: builder.mutation<FileData[], string>({
      query(taskId) {
        return {
          url: `file?taskId=${taskId}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    getBoardFiles: builder.mutation<FileData[], string>({
      query(boardId) {
        return {
          url: `file/${boardId}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    deleteFile: builder.mutation<FileData, string>({
      query(fileId) {
        return {
          url: `file/${fileId}`,
          method: 'DELETE',
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
  }),
});

export const {} = fileApi;
