"use client";

import * as React from 'react';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { fetcher } from '@lib/fetcher';
import DashboardLayout from '@components/DashboardLayout';
import { Typography, CircularProgress, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface RecordHistoryItem {
  version: number;
  status: string;
  data: any;
  prevHash: string;
  hash: string;
  createdAt: string;
}

export default function RecordHistoryPage() {
  const params = useParams();
  const key = Array.isArray(params?.key) ? params.key[0] : params?.key;
  const { data, error, isLoading } = useSWR<RecordHistoryItem[]>(key ? `/records/${key}/history` : null, fetcher);

  return (
    <DashboardLayout>
      <Typography variant="h5" gutterBottom>
        레코드 이력: {key}
      </Typography>
      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">{error.message}</Alert>}
      {data && (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Version</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Data</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.version}>
                  <TableCell>{row.version}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{new Date(row.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <pre style={{ margin: 0, fontSize: 12 }}>{JSON.stringify(row.data, null, 2)}</pre>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DashboardLayout>
  );
}
