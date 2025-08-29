import * as React from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface GlobalSnackbarProps {
  open: boolean;
  message: string;
  severity?: AlertColor;
  onClose: () => void;
}

export default function GlobalSnackbar({ open, message, severity = 'info', onClose }: GlobalSnackbarProps) {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
