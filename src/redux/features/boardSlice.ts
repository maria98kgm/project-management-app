import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardData, ColumnData, DeleteColumn } from '../../models';
import { RootState } from '../store';

interface IBoardState {
  boards: BoardData[];
}

const initialState: IBoardState = {
  boards: [],
};

export const boardSlice = createSlice({
  initialState,
  name: 'boardSlice',
  reducers: {
    setBoards: (state, action: PayloadAction<BoardData[]>) => {
      state.boards = [...action.payload];
    },
    addBoard: (state, action: PayloadAction<BoardData>) => {
      state.boards = [...state.boards, action.payload];
    },
    deleteBoard: (state, action: PayloadAction<string>) => {
      state.boards = state.boards.filter((board) => board._id !== action.payload);
    },
    setColumns: (state, action: PayloadAction<{ columns: ColumnData[]; boardId: string }>) => {
      const currentBoard = state.boards.findIndex((board) => board._id === action.payload.boardId);
      state.boards[currentBoard].columns = [...action.payload.columns];
    },
    addColumn: (state, action: PayloadAction<ColumnData>) => {
      const currentBoard = state.boards.findIndex((board) => board._id === action.payload.boardId);
      if (!state.boards[currentBoard].columns) {
        state.boards[currentBoard].columns = [action.payload];
      } else {
        state.boards[currentBoard].columns = [
          ...(state.boards[currentBoard].columns as ColumnData[]),
          action.payload,
        ];
      }
    },
    deleteColumn: (state, action: PayloadAction<DeleteColumn>) => {
      const currentBoard = state.boards.findIndex((board) => board._id === action.payload.boardId);
      if (state.boards[currentBoard].columns) {
        state.boards[currentBoard].columns = state.boards[currentBoard].columns!.filter(
          (column: ColumnData) => column._id !== action.payload.columnId
        );
      }
    },
    updateColumnInfo: (state, action: PayloadAction<ColumnData>) => {
      const currentBoard = state.boards.findIndex((board) => board._id === action.payload.boardId);
      if (state.boards[currentBoard].columns) {
        state.boards[currentBoard].columns = state.boards[currentBoard].columns!.map(
          (column: ColumnData) => {
            if (column._id === action.payload._id) column.title = action.payload.title;
            return column;
          }
        );
      }
    },
  },
});

export default boardSlice.reducer;

export const selectBoards = (store: RootState) => store.board.boards;

export const {
  setBoards,
  addBoard,
  deleteBoard,
  setColumns,
  addColumn,
  deleteColumn,
  updateColumnInfo,
} = boardSlice.actions;
