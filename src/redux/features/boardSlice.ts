import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardData } from '../../models';

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
  },
});

export default boardSlice.reducer;

export const { setBoards } = boardSlice.actions;
