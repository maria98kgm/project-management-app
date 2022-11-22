import { ColumnData, ColumnsSetData, ColumnUpCrData } from '../../../models';
import { getCookieToken } from '../../../share/cookieToken';
import { apiSlice } from '../apiSlice';

export const columnApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getBoardColumns: build.mutation<ColumnData[], string>({
      query(boardId) {
        return {
          url: `boards/${boardId}/columns`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    createColumn: build.mutation<ColumnData, { boardId: string; columnInfo: ColumnUpCrData }>({
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
    getColumn: build.mutation<ColumnData, { boardId: string; columnId: string }>({
      query(data) {
        return {
          url: `boards/${data.boardId}/columns/${data.columnId}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    updateColumn: build.mutation<
      ColumnData,
      { boardId: string; columnId: string; columnInfo: ColumnUpCrData }
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
    deleteColumn: build.mutation<ColumnData, { boardId: string; columnId: string }>({
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
    getColumnsByIdsList: build.mutation<ColumnData[], string[]>({
      query(idsList) {
        return {
          url: `columnsSet?ids=${idsList}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    getUserColumns: build.mutation<ColumnData[], string>({
      query(userId) {
        return {
          url: `columnsSet?userId=${userId}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    updateSetOfColumns: build.mutation<ColumnData[], ColumnsSetData[]>({
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
    createSetOfColumns: build.mutation<ColumnData[], ColumnData[]>({
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

export const {
  useGetBoardColumnsMutation,
  useCreateColumnMutation,
  useGetColumnMutation,
  useUpdateColumnMutation,
  useDeleteColumnMutation,
  useGetColumnsByIdsListMutation,
  useGetUserColumnsMutation,
  useUpdateSetOfColumnsMutation,
  useCreateSetOfColumnsMutation,
} = columnApi;
