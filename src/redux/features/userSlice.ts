import { createSlice } from '@reduxjs/toolkit';
import { UserData } from '../../models';
import { parseJwt } from '../../share/utils';
import { authApi } from './api/authApi';

interface IUserState {
  user: Partial<UserData> | null;
}

const currentUser: string | null = localStorage.getItem('user');

const initialState: IUserState = {
  user: currentUser ? JSON.parse(currentUser) : null,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.signIn.matchFulfilled, (state, action) => {
      const data = parseJwt(action.payload);
      state.user = {
        _id: data.id,
        login: data.login,
      };
    });
  },
});

export default userSlice.reducer;

// export const { setUser } = userSlice.actions;
