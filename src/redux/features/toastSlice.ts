import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertColor } from '@mui/material/Alert';
import { ToastData } from '../../models';
import { RootState } from '../store';

interface IToastState {
  toast: ToastData;
}

const initialState: IToastState = {
  toast: {
    isOpen: false,
    severity: 'info' as AlertColor,
    message: '',
  },
};

export const toastSlice = createSlice({
  initialState,
  name: 'toastSlice',
  reducers: {
    showToast: (state, action: PayloadAction<ToastData>) => {
      state.toast = { ...action.payload };
    },
  },
});

export default toastSlice.reducer;

export const selectToast = (store: RootState) => store.toast.toast;

export const { showToast } = toastSlice.actions;
