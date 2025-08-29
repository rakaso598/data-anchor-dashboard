import React, { createContext, useContext, useState, useEffect } from 'react';

interface ApiKeyContextType {
  apiKey: string | null;
  setApiKey: (key: string | null) => void;
}

const ApiKeyContext = createContext<ApiKeyContextType>({ apiKey: null, setApiKey: () => { } });

export function useApiKey() {
  return useContext(ApiKeyContext);
}

export function ApiKeyProvider({ children }: { children: React.ReactNode }) {
  const [apiKey, setApiKeyState] = useState<string | null>(null);

  // localStorage → state 동기화 (초기화 및 storage 이벤트 대응)
  useEffect(() => {
    const sync = () => {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('apiKey') : null;
      setApiKeyState(stored);
    };
    sync();
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const setApiKey = (key: string | null) => {
    setApiKeyState(key);
    if (typeof window !== 'undefined') {
      if (key) localStorage.setItem('apiKey', key);
      else localStorage.removeItem('apiKey');
    }
  };

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
}
