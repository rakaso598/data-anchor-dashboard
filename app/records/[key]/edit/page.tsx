import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { fetcher } from '../../../lib/fetcher';
import DashboardLayout from '../../../components/DashboardLayout';
import { TextField, Button, Paper, Typography, Box, Alert, CircularProgress } from '@mui/material';

const schema = z.object({
  data: z.string().min(1, 'Data is required'), // JSON string
});

type FormValues = z.infer<typeof schema>;

async function updateRecord(url: string, { arg }: { arg: FormValues }) {
  const res = await fetcher(url, {
    method: 'PUT',
    body: JSON.stringify({ data: JSON.parse(arg.data) }),
  });
  return res;
}

export default function UpdateRecordPage() {
  const params = useParams();
  const router = useRouter();
  const key = Array.isArray(params?.key) ? params.key[0] : params?.key;
  const { data: record, isLoading } = useSWR<any>(key ? `/records/${key}` : null, fetcher);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { data: record ? JSON.stringify(record.data, null, 2) : '' },
  });
  const { trigger, isMutating, error, data } = useSWRMutation(key ? `/records/${key}` : '', updateRecord);

  React.useEffect(() => {
    if (record) {
      reset({ data: JSON.stringify(record.data, null, 2) });
    }
  }, [record, reset]);

  const onSubmit = async (values: FormValues) => {
    await trigger(values);
  };

  return (
    <DashboardLayout>
      <Typography variant="h5" gutterBottom>레코드 수정: {key}</Typography>
      <Paper sx={{ p: 2, maxWidth: 480 }}>
        {isLoading && <CircularProgress />}
        {record && (
          <form onSubmit={handleSubmit(onSubmit)}>
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
                수정
              </Button>
              {isMutating && <CircularProgress size={24} />}
            </Box>
          </form>
        )}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error.message}</Alert>}
        {data && <Alert severity="success" sx={{ mt: 2 }}>수정 완료!</Alert>}
      </Paper>
    </DashboardLayout>
  );
}
