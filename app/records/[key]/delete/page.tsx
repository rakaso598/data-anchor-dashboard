import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import useSWRMutation from 'swr/mutation';
import { fetcher } from '../../../lib/fetcher';
import DashboardLayout from '../../../components/DashboardLayout';
import { Button, Paper, Typography, Box, Alert, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

async function deleteRecord(url: string) {
  const res = await fetcher(url, { method: 'DELETE' });
  return res;
}

export default function DeleteRecordPage() {
  const params = useParams();
  const router = useRouter();
  const key = Array.isArray(params?.key) ? params.key[0] : params?.key;
  const { trigger, isMutating, error, data } = useSWRMutation(key ? `/records/${key}` : '', deleteRecord);
  const [open, setOpen] = React.useState(true);

  const handleDelete = async () => {
    await trigger();
    setTimeout(() => router.push('/'), 1200);
  };

  return (
    <DashboardLayout>
      <Dialog open={open} onClose={() => router.back()}>
        <DialogTitle>레코드 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText>
            정말로 <b>{key}</b> 레코드를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </DialogContentText>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error.message}</Alert>}
          {data && <Alert severity="success" sx={{ mt: 2 }}>삭제 완료! 잠시 후 목록으로 이동합니다.</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => router.back()} disabled={isMutating}>취소</Button>
          <Button onClick={handleDelete} color="error" variant="contained" disabled={isMutating}>
            삭제
          </Button>
          {isMutating && <CircularProgress size={24} sx={{ ml: 2 }} />}
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}
