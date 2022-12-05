import { AlertColor } from '@mui/material/Alert';

export interface ToastData {
  isOpen: boolean;
  severity: AlertColor;
  message: string;
}
