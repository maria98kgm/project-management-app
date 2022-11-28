import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardData, ColumnData, DeleteColumn, TaskData } from '../../models';
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
    setTasks: (
      state,
      action: PayloadAction<{ tasks: TaskData[]; boardId: string; columnId: string }>
    ) => {
      const currentBoard = state.boards.findIndex((board) => board._id === action.payload.boardId);
      const currentColumn = state.boards[currentBoard].columns!.findIndex(
        (column) => column._id === action.payload.columnId
      );
      state.boards[currentBoard].columns![currentColumn].tasks = [...action.payload.tasks];
    },
    addTask: (state, action: PayloadAction<TaskData>) => {
      const currentBoard = state.boards.findIndex((board) => board._id === action.payload.boardId);
      const currentColumn = state.boards[currentBoard].columns!.findIndex(
        (column) => column._id === action.payload.columnId
      );
      if (currentBoard !== -1 && currentColumn !== -1) {
        if (!state.boards[currentBoard].columns![currentColumn].tasks) {
          state.boards[currentBoard].columns![currentColumn].tasks = [action.payload];
        } else {
          state.boards[currentBoard].columns![currentColumn].tasks = [
            ...(state.boards[currentBoard].columns![currentColumn].tasks as TaskData[]),
            action.payload,
          ];
        }
      }
    },
  },
});

export default boardSlice.reducer;

export const selectBoards = (store: RootState) => store.boards.boards;

export const {
  setBoards,
  addBoard,
  deleteBoard,
  setColumns,
  addColumn,
  deleteColumn,
  updateColumnInfo,
  setTasks,
  addTask,
} = boardSlice.actions;
