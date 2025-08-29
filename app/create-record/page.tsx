import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { fetcher } from '../lib/fetcher';
import useSWRMutation from 'swr/mutation';
import DashboardLayout from '../components/DashboardLayout';
import { TextField, Button, Paper, Typography, Box, Alert, CircularProgress } from '@mui/material';

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
  const { trigger, isMutating, error, data } = useSWRMutation('/records', createRecord);

  const onSubmit = async (values: FormValues) => {
    await trigger(values);
    reset();
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
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error.message}</Alert>}
        {data && <Alert severity="success" sx={{ mt: 2 }}>생성 완료!</Alert>}
      </Paper>
    </DashboardLayout>
  );
}
