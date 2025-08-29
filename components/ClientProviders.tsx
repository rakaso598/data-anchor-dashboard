"use client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { SnackbarProvider } from "./SnackbarProvider";
import { ApiKeyProvider } from "./ApiKeyProvider";
import * as React from "react";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#9c27b0" },
  },
});

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApiKeyProvider>
        <SnackbarProvider>
          {children}
        </SnackbarProvider>
      </ApiKeyProvider>
    </ThemeProvider>
  );
}
