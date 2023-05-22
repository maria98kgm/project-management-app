import {
  ColumnData,
  CreateColumn,
  CreateColumnsSet,
  DeleteColumn,
  GetColumn,
  UpdateColumn,
  UpdateColumnsSet,
} from '../../../models';
import { getCookieToken } from '../../../share/cookieToken';
import { apiSlice } from '../apiSlice';
import {
  setColumns,
  addColumn,
  deleteColumn,
  updateColumnInfo,
  updateColumnsOrder,
} from '../boardSlice';

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
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const columns = [...data];
          columns.sort((a, b) => a.order - b.order);

          if (data.length) dispatch(setColumns({ columns: columns, boardId: data[0].boardId }));
        } catch (err) {
          if (err instanceof Error) console.error(err.message);
        }
      },
    }),
    createColumn: build.mutation<ColumnData, CreateColumn>({
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
      transformResponse: (response: ColumnData) => response,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addColumn(data));
        } catch (err) {
          if (err instanceof Error) console.error(err.message);
        }
      },
    }),
    getColumn: build.mutation<ColumnData, GetColumn>({
      query(data) {
        return {
          url: `boards/${data.boardId}/columns/${data.columnId}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    updateColumn: build.mutation<ColumnData, UpdateColumn>({
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
      transformResponse: (response: ColumnData) => response,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateColumnInfo(data));
        } catch (err) {
          if (err instanceof Error) console.error(err.message);
        }
      },
    }),
    deleteColumn: build.mutation<ColumnData, DeleteColumn>({
      query(data) {
        return {
          url: `boards/${data.boardId}/columns/${data.columnId}`,
          method: 'DELETE',
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(deleteColumn({ boardId: data.boardId, columnId: data._id }));
        } catch (err) {
          if (err instanceof Error) console.error(err.message);
        }
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
    updateSetOfColumns: build.mutation<ColumnData[], UpdateColumnsSet[]>({
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
      transformResponse: (response: ColumnData[]) => response,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateColumnsOrder({ columns: data, boardId: data[0].boardId }));
        } catch (err) {
          if (err instanceof Error) console.error(err.message);
        }
      },
    }),
    createSetOfColumns: build.mutation<ColumnData[], CreateColumnsSet[]>({
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
