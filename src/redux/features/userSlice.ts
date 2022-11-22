import { createSlice } from '@reduxjs/toolkit';
import { UserData } from '../../models';
import { parseJwt } from '../../share/utils';
import { authApi } from './api/authApi';

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

// export const { setUser } = userSlice.actions;
