import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { URL_BASE } from '../../../constants';
import { getCookieToken } from '../../../share/cookieToken';

interface ColumnData {
  _id?: string;
  title: string;
  order: number;
  boardId?: string;
}

export const columnApi = createApi({
  reducerPath: 'columnApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${URL_BASE}/` }),
  endpoints: (builder) => ({
    getBoardColumns: builder.mutation<ColumnData[], string>({
      query(boardId) {
        return {
          url: `boards/${boardId}/columns`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    createColumn: builder.mutation<ColumnData, { boardId: string; columnInfo: ColumnData }>({
      query(data) {
        return {
          url: `boards/${data.boardId}/columns`,
          method: 'POST',
          headers: {
            Authorization: getCookieToken(),
          },
          body: data.columnInfo,
        };
      },
    }),
    getColumn: builder.mutation<ColumnData, { boardId: string; columnId: string }>({
      query(data) {
        return {
          url: `boards/${data.boardId}/columns/${data.columnId}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    updateColumn: builder.mutation<
      ColumnData,
      { boardId: string; columnId: string; columnInfo: ColumnData }
    >({
      query(data) {
        return {
          url: `boards/${data.boardId}/columns/${data.columnId}`,
          method: 'PUT',
          headers: {
            Authorization: getCookieToken(),
          },
          body: data.columnInfo,
        };
      },
    }),
    deleteColumn: builder.mutation<ColumnData, { boardId: string; columnId: string }>({
      query(data) {
        return {
          url: `boards/${data.boardId}/columns/${data.columnId}`,
          method: 'DELETE',
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    getColumnsByIdsList: builder.mutation<ColumnData[], string[]>({
      query(idsList) {
        return {
          url: `columnsSet?ids=${idsList}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    getUserColumns: builder.mutation<ColumnData[], string>({
      query(userId) {
        return {
          url: `columnsSet?userId=${userId}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    updateSetOfColumns: builder.mutation<ColumnData[], ColumnData[]>({
      query(columns) {
        return {
          url: `columnsSet`,
          method: 'PATCH',
          headers: {
            Authorization: getCookieToken(),
          },
          body: columns,
        };
      },
    }),
    createSetOfColumns: builder.mutation<ColumnData[], ColumnData[]>({
      query(columns) {
        return {
          url: `columnsSet`,
          method: 'POST',
          headers: {
            Authorization: getCookieToken(),
          },
          body: columns,
        };
      },
    }),
  }),
});

export const {} = columnApi;
