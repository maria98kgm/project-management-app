import { BoardData, NewBoardData, UpdateBoard } from '../../../models';
import { getCookieToken } from '../../../share/cookieToken';
import { apiSlice } from '../apiSlice';
import { setBoards, addBoard, deleteBoard } from '../boardSlice';

export const boardApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllBoards: build.mutation<BoardData[], null>({
      query() {
        return {
          url: 'boards',
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    createBoard: build.mutation<BoardData, NewBoardData>({
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
      transformResponse: (response: BoardData) => response,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addBoard(data));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    getBoard: build.mutation<BoardData, string>({
      query(boardId) {
        return {
          url: `boards/${boardId}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    updateBoard: build.mutation<BoardData, UpdateBoard>({
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
    deleteBoard: build.mutation<BoardData, string>({
      query(boardId) {
        return {
          url: `boards/${boardId}`,
          method: 'DELETE',
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(deleteBoard(data._id));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    getBoardsByIdsList: build.mutation<BoardData[], string[]>({
      query(idsList) {
        return {
          url: `boardsSet?ids=${idsList}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    getUserBoards: build.mutation<BoardData[], string>({
      query(userId) {
        return {
          url: `boardsSet/${userId}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
      transformResponse: (response: BoardData[]) => response,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setBoards(data));
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const {
  useGetAllBoardsMutation,
  useCreateBoardMutation,
  useGetBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
  useGetBoardsByIdsListMutation,
  useGetUserBoardsMutation,
} = boardApi;
