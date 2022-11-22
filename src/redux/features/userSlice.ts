import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../models';

interface IUserState {
  user: UserData | null;
}

const currentUser: string | null = localStorage.getItem('user');

const initialState: IUserState = {
  user: currentUser ? JSON.parse(currentUser) : null,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { setUser } = userSlice.actions;
