import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JWTPayload, StateUserInfo } from '../../models';
import { decodeToken } from '../../share/cookieToken';
import { RootState } from '../store';

interface UserState {
  userInfo: StateUserInfo | null;
}

let currentUser: StateUserInfo | null = null;

const token: '' | RegExpMatchArray | null =
  document.cookie && document.cookie.match(/^Bearer=([^;]+)/);

if (token) {
  const jwtPayload: JWTPayload = decodeToken(token[1]);
  currentUser = { login: jwtPayload.login, _id: jwtPayload.id };
}

const initialState: UserState = {
  userInfo: currentUser,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    setUser: (state, action: PayloadAction<StateUserInfo | null>) => {
      state.userInfo = action.payload;
    },
  },
});

export default userSlice.reducer;

export const selectUserInfo = (store: RootState) => store.user.userInfo;

export const { setUser } = userSlice.actions;
