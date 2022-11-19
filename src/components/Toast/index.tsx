import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';

const HIDE_DURATION = 4000;
const BOTTOM = 'bottom';
const RIGHT = 'right';
const CLICK_AWAY = 'clickaway';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type ToastState = {
  isOpen: boolean;
  severity: AlertColor;
  message: string;
};

export const Toast = () => {
  const [state, setState] = useState<ToastState>({
    isOpen: true,
    severity: 'error',
    message: 'This is an error message',
  });

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === CLICK_AWAY) {
      return;
    }

    setState({ ...state, isOpen: false });
  };

  return (
    <React.Fragment>
      <Snackbar
        open={state.isOpen}
        autoHideDuration={HIDE_DURATION}
        onClose={handleClose}
        anchorOrigin={{
          vertical: BOTTOM,
          horizontal: RIGHT,
        }}
      >
        <Alert onClose={handleClose} severity={state.severity}>
          {state.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};
