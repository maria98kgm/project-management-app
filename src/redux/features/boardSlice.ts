import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Board } from '../../models';
import { boardApi } from './api/boardApi';

interface IBoardState {
  boards: Board[];
}

const initialState: IBoardState = {
  boards: [],
};

export const boardSlice = createSlice({
  initialState,
  name: 'boardSlice',
  reducers: {
    setBoards: (state, action: PayloadAction<Board[]>) => {
      state.boards = [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(boardApi.endpoints.createBoard.matchFulfilled, (state, action) => {
      state.boards = [...state.boards, action.payload];
    });
  },
});

export default boardSlice.reducer;

export const { setBoards } = boardSlice.actions;
