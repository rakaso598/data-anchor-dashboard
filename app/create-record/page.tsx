import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { fetcher } from '../lib/fetcher';
import useSWRMutation from 'swr/mutation';
import DashboardLayout from '../components/DashboardLayout';
import { TextField, Button, Paper, Typography, Box, CircularProgress } from '@mui/material';
import { useSnackbar } from '../components/SnackbarProvider';

const schema = z.object({
  key: z.string().min(1, 'Key is required'),
  data: z.string().min(1, 'Data is required'), // JSON string
});

type FormValues = z.infer<typeof schema>;

async function createRecord(url: string, { arg }: { arg: FormValues }) {
  const res = await fetcher('/records', {
    method: 'POST',
    body: JSON.stringify({ key: arg.key, data: JSON.parse(arg.data) }),
  });
  return res;
}

export default function CreateRecordPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const { trigger, isMutating } = useSWRMutation('/records', createRecord);
  const { showMessage } = useSnackbar();

  const onSubmit = async (values: FormValues) => {
    try {
      await trigger(values);
      showMessage('레코드가 성공적으로 생성되었습니다.', 'success');
      reset();
    } catch (e: any) {
      showMessage(e?.message || '생성 중 오류가 발생했습니다.', 'error');
    }
  };

  return (
    <DashboardLayout>
      <Typography variant="h5" gutterBottom>레코드 생성</Typography>
      <Paper sx={{ p: 2, maxWidth: 480 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Key"
            fullWidth
            margin="normal"
            {...register('key')}
            error={!!errors.key}
            helperText={errors.key?.message}
          />
          <TextField
            label="Data (JSON)"
            fullWidth
            margin="normal"
            multiline
            minRows={3}
            {...register('data')}
            error={!!errors.data}
            helperText={errors.data?.message}
          />
          <Box mt={2} display="flex" gap={2}>
            <Button type="submit" variant="contained" disabled={isMutating}>
              생성
            </Button>
            {isMutating && <CircularProgress size={24} />}
          </Box>
        </form>
        {/* 기존 Alert 제거, 스낵바로 대체 */}
      </Paper>
    </DashboardLayout>
  );
}
