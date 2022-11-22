import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import { authApi } from './features/api/authApi';
import { userApi } from './features/api/userApi';
import { boardApi } from './features/api/boardApi';
import { columnApi } from './features/api/columnApi';
import { taskApi } from './features/api/taskApi';
import { fileApi } from './features/api/fileApi';
import { pointApi } from './features/api/pointApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [boardApi.reducerPath]: boardApi.reducer,
    [columnApi.reducerPath]: columnApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [fileApi.reducerPath]: fileApi.reducer,
    [pointApi.reducerPath]: pointApi.reducer,
    user: userReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authApi.middleware,
      userApi.middleware,
      boardApi.middleware,
      columnApi.middleware,
      taskApi.middleware,
      fileApi.middleware,
      pointApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
