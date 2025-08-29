import * as React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import ApiKeyUnlockButton from './ApiKeyUnlockButton';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}>
              Data Anchor Dashboard
            </Typography>
          </Link>
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
