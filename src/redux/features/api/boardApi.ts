import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { URL_BASE } from '../../../constants';
import { BoardData } from '../../../models';
import { getCookieToken } from '../../../share/cookieToken';

export const boardApi = createApi({
  reducerPath: 'boardApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${URL_BASE}/` }),
  endpoints: (builder) => ({
    getAllBoards: builder.mutation<BoardData[], null>({
      query() {
        return {
          url: 'boards',
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    createBoard: builder.mutation<BoardData, BoardData>({
      query(data) {
        return {
          url: 'boards',
          method: 'POST',
          headers: {
            Authorization: getCookieToken(),
          },
          body: data,
        };
      },
    }),
    getBoard: builder.mutation<BoardData, string>({
      query(boardId) {
        return {
          url: `boards/${boardId}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    updateBoard: builder.mutation<BoardData, { boardId: string; boardInfo: BoardData }>({
      query(data) {
        return {
          url: `boards/${data.boardId}`,
          method: 'PUT',
          headers: {
            Authorization: getCookieToken(),
          },
          body: data.boardInfo,
        };
      },
    }),
    deleteBoard: builder.mutation<BoardData, string>({
      query(boardId) {
        return {
          url: `boards/${boardId}`,
          method: 'DELETE',
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    getBoardsByIdsList: builder.mutation<BoardData[], string[]>({
      query(idsList) {
        return {
          url: `boardsSet?ids=${idsList}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    getAllUserBoards: builder.mutation<BoardData, string>({
      query(userId) {
        return {
          url: `boardsSet/${userId}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
  }),
});

export const {} = boardApi;
