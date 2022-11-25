import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './features/apiSlice';
import userReducer from './features/userSlice';
import boardReducer from './features/boardSlice';
import toastReducer from './features/toastSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
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
