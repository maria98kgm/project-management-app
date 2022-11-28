import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateUserInfo, UserName } from '../../models';
import { RootState } from '../store';

interface UserState {
  userInfo: StateUserInfo | null;
  allUsers: UserName[];
}

const currentUser: string | null = localStorage.getItem('user');

const initialState: UserState = {
  userInfo: currentUser ? JSON.parse(currentUser) : null,
  allUsers: [],
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    setUser: (state, action: PayloadAction<StateUserInfo | null>) => {
      state.userInfo = action.payload;
    },
    setAllUsers: (state, action: PayloadAction<UserName[]>) => {
      state.allUsers = [...action.payload];
    },
  },
});

export default userSlice.reducer;

export const selectUserInfo = (store: RootState) => store.user.userInfo;
export const selectUses = (store: RootState) => store.user.allUsers;

export const { setUser, setAllUsers } = userSlice.actions;
