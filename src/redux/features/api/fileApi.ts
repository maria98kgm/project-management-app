import { FileData } from '../../../models';
import { getCookieToken } from '../../../share/cookieToken';
import { apiSlice } from '../apiSlice';

export const fileApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getFilesByIdsList: build.mutation<FileData[], string[]>({
      query(idsList) {
        return {
          url: `file?ids=${idsList}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    getUserFiles: build.mutation<FileData[], string>({
      query(userId) {
        return {
          url: `file?userId=${userId}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    getTaskFiles: build.mutation<FileData[], string>({
      query(taskId) {
        return {
          url: `file?taskId=${taskId}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    getBoardFiles: build.mutation<FileData[], string>({
      query(boardId) {
        return {
          url: `file/${boardId}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    deleteFile: build.mutation<FileData, string>({
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

export const {
  useGetFilesByIdsListMutation,
  useGetUserFilesMutation,
  useGetTaskFilesMutation,
  useGetBoardFilesMutation,
  useDeleteFileMutation,
} = fileApi;
