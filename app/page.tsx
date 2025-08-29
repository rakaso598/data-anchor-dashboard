import * as React from "react";
import RootLayout from "../components/RootLayout";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

interface RecordItem {
  key: string;
  version: number;
  data: any;
  status: string;
  prevHash: string;
  hash: string;
  createdAt: string;
}

export default function HomePage() {
  const { data, error, isLoading } = useSWR<RecordItem[]>("/records", fetcher);

  return (
    <RootLayout>
      <Typography variant="h4" gutterBottom>
        레코드 목록
      </Typography>
      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">{error.message}</Alert>}
      {data && (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Key</TableCell>
                <TableCell>Version</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.key}>
                  <TableCell>{row.key}</TableCell>
                  <TableCell>{row.version}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    {new Date(row.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </RootLayout>
  );
}
