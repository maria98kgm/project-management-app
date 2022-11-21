import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../models';

interface IUserState {
  user: UserData | null;
  token: string | null;
}

const initialState: IUserState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { setUser, setToken } = userSlice.actions;
