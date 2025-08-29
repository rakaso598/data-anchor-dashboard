import * as React from 'react';
import GlobalSnackbar from '../components/GlobalSnackbar';

interface SnackbarContextType {
  showMessage: (message: string, severity?: 'success' | 'error' | 'info' | 'warning') => void;
}

const SnackbarContext = React.createContext<SnackbarContextType>({ showMessage: () => { } });

export function useSnackbar() {
  return React.useContext(SnackbarContext);
}

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [severity, setSeverity] = React.useState<'success' | 'error' | 'info' | 'warning'>('info');

  const showMessage = (msg: string, sev: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <GlobalSnackbar open={open} message={message} severity={severity} onClose={handleClose} />
    </SnackbarContext.Provider>
  );
}
