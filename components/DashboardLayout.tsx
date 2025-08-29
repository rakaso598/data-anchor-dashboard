import * as React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import ApiKeyUnlockButton from './ApiKeyUnlockButton';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Data Anchor Dashboard
          </Typography>
          <ApiKeyUnlockButton />
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
      <Box component="footer" sx={{ py: 2, textAlign: 'center', color: 'text.secondary' }}>
        © {new Date().getFullYear()} Data Anchor Dashboard
      </Box>
    </>
  );
}
