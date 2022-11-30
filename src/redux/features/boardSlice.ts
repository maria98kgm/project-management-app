import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardData, ColumnData, DeleteColumn, TaskData, DeleteTask } from '../../models';
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
      if (currentBoard !== -1 && state.boards[currentBoard].columns) {
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
    updateColumnsOrder: (
      state,
      action: PayloadAction<{ columns: ColumnData[]; boardId: string }>
    ) => {
      const currentBoard = state.boards.findIndex((board) => board._id === action.payload.boardId);
      if (state.boards[currentBoard].columns) {
        state.boards[currentBoard].columns = state.boards[currentBoard].columns!.map(
          (column: ColumnData) => {
            action.payload.columns.forEach((col) => {
              if (column._id === col._id) column.order = col.order;
            });
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
    deleteTask: (state, action: PayloadAction<DeleteTask>) => {
      const currentBoard = state.boards.findIndex((board) => board._id === action.payload.boardId);
      const currentColumn = state.boards[currentBoard].columns!.findIndex(
        (column) => column._id === action.payload.columnId
      );
      if (state.boards[currentBoard].columns![currentColumn].tasks) {
        state.boards[currentBoard].columns![currentColumn].tasks = state.boards[
          currentBoard
        ].columns![currentColumn].tasks!.filter(
          (task: Partial<TaskData>) => task._id !== action.payload.taskId
        );
      }
    },
    updateTaskInfo: (state, action: PayloadAction<TaskData>) => {
      const currentBoard = state.boards.findIndex((board) => board._id === action.payload.boardId);
      const currentColumn = state.boards[currentBoard].columns!.findIndex(
        (column) => column._id === action.payload.columnId
      );
      if (state.boards[currentBoard].columns![currentColumn].tasks) {
        state.boards[currentBoard].columns![currentColumn].tasks = state.boards[
          currentBoard
        ].columns![currentColumn].tasks!.map((task: TaskData) => {
          if (task._id === action.payload._id) {
            task.title = action.payload.title;
            task.description = action.payload.description;
            task.users = [...action.payload.users];
          }
          return task;
        });
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
  updateColumnsOrder,
  setTasks,
  addTask,
  deleteTask,
  updateTaskInfo,
} = boardSlice.actions;
