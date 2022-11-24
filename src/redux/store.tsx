import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import boardReducer from './features/boardSlice';
import { apiSlice } from './features/apiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
    boards: boardReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([apiSlice.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
