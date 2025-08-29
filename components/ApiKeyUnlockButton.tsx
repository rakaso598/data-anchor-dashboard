import React, { useState, useEffect } from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, InputAdornment, Tooltip } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useApiKey } from './ApiKeyProvider';

export default function ApiKeyUnlockButton() {
  const { apiKey, setApiKey } = useApiKey();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(apiKey || '');
  const [pendingSave, setPendingSave] = useState(false);

  const handleOpen = () => {
    setInput(apiKey || '');
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleSave = () => {
    setApiKey(input.trim() || null);
    setPendingSave(true);
  };
  const handleClear = () => {
    setApiKey(null);
    setInput('');
    setPendingSave(true);
  };

  // 상태가 반영된 후 다이얼로그 닫기
  useEffect(() => {
    if (pendingSave) {
      setOpen(false);
      setPendingSave(false);
    }
  }, [apiKey, pendingSave]);

  return (
    <>
      <Tooltip title={apiKey ? 'API Key 등록됨 (클릭하여 변경/해제)' : 'API Key 등록 필요'}>
        <IconButton color={apiKey ? 'success' : 'default'} onClick={handleOpen} size="large">
          {apiKey ? <LockOpenIcon /> : <LockIcon />}
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>API Key {apiKey ? '변경/해제' : '등록'}</DialogTitle>
        <DialogContent>
          <TextField
            label="API Key"
            value={input}
            onChange={e => setInput(e.target.value)}
            fullWidth
            margin="normal"
            type="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setInput('')} size="small">
                    ✕
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          {apiKey && <Button onClick={handleClear} color="error">해제</Button>}
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleSave} variant="contained" disabled={!input.trim()}>저장</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
