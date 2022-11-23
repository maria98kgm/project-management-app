import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../models';
import { RootState } from '../store';

interface IUserState {
  userInfo: UserData | null;
}

const currentUser: string | null = localStorage.getItem('user');

const initialState: IUserState = {
  userInfo: currentUser ? JSON.parse(currentUser) : null,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.userInfo = action.payload;
    },
  },
});

export default userSlice.reducer;

export const selectUserInfo = (store: RootState) => store.user.userInfo;

export const { setUser } = userSlice.actions;
