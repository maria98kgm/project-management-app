import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateUserInfo } from '../../models';
import { RootState } from '../store';

interface UserState {
  userInfo: StateUserInfo | null;
}

const currentUser: string | null = localStorage.getItem('user');

const initialState: UserState = {
  userInfo: currentUser ? JSON.parse(currentUser) : null,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    setUser: (state, action: PayloadAction<StateUserInfo>) => {
      state.userInfo = action.payload;
    },
  },
});

export default userSlice.reducer;

export const selectUserInfo = (store: RootState) => store.user.userInfo;

export const { setUser } = userSlice.actions;
