import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardData } from '../../models';
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
  },
});

export default boardSlice.reducer;

export const selectBoards = (store: RootState) => store.boards.boards;

export const { setBoards, addBoard, deleteBoard } = boardSlice.actions;
