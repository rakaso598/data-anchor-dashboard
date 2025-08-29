"use client";

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import { fetcher } from '../../../lib/fetcher';
import DashboardLayout from '../../../components/DashboardLayout';
import { Typography, CircularProgress, Alert, Paper, Button, Box } from '@mui/material';

interface RecordItem {
  key: string;
  version: number;
  data: any;
  status: string;
  prevHash: string;
  hash: string;
  createdAt: string;
}

export default function RecordDetailPage() {
  const params = useParams();
  const router = useRouter();
  const key = Array.isArray(params?.key) ? params.key[0] : params?.key;
  const { data, error, isLoading } = useSWR<RecordItem>(key ? `/records/${key}` : null, fetcher);

  return (
    <DashboardLayout>
      <Typography variant="h5" gutterBottom>
        레코드 상세: {key}
      </Typography>
      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">{error.message}</Alert>}
      {data && (
        <Paper sx={{ p: 2, mb: 2 }}>
          <Box mb={1}><b>Key:</b> {data.key}</Box>
          <Box mb={1}><b>Version:</b> {data.version}</Box>
          <Box mb={1}><b>Status:</b> {data.status}</Box>
          <Box mb={1}><b>Created At:</b> {new Date(data.createdAt).toLocaleString()}</Box>
          <Box mb={1}><b>Data:</b> <pre style={{ margin: 0, fontSize: 12 }}>{JSON.stringify(data.data, null, 2)}</pre></Box>
        </Paper>
      )}
      <Button variant="outlined" onClick={() => router.push(`/records/${key}/history`)}>
        이력 보기
      </Button>
      <Button variant="contained" sx={{ ml: 2 }} onClick={() => router.push(`/records/${key}/edit`)}>
        수정
      </Button>
      <Button variant="outlined" color="error" sx={{ ml: 2 }} onClick={() => router.push(`/records/${key}/delete`)}>
        삭제
      </Button>
    </DashboardLayout>
  );
}
