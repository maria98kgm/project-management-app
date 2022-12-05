import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';
import { showToast } from '../../redux/features/toastSlice';
import { useTypedDispatch } from '../../redux/store';

const HIDE_DURATION = 4000;
const BOTTOM = 'bottom';
const RIGHT = 'right';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type ToastProps = {
  isOpen: boolean;
  severity: AlertColor;
  message: string;
};

export const Toast: React.FC<ToastProps> = ({ isOpen, severity, message }) => {
  const dispatch = useTypedDispatch();

  const handleClose = (): void => {
    dispatch(showToast({ isOpen: false, severity, message }));
  };

  return (
    <React.Fragment>
      <Snackbar
        open={isOpen}
        autoHideDuration={HIDE_DURATION}
        onClose={handleClose}
        anchorOrigin={{
          vertical: BOTTOM,
          horizontal: RIGHT,
        }}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};
