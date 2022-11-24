import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './features/api/authApi';
import { userApi } from './features/api/userApi';
import { boardApi } from './features/api/boardApi';
import { apiSlice } from './features/apiSlice';
import userReducer from './features/userSlice';
import boardReducer from './features/boardSlice';
import toastReducer from './features/toastSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [boardApi.reducerPath]: boardApi.reducer,
    user: userReducer,
    boards: boardReducer,
    toast: toastReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([apiSlice.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
