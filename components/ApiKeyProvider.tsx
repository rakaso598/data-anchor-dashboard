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
  // SSR-safe: 초기값은 항상 null
  const [apiKey, setApiKeyState] = useState<string | null>(null);

  // 클라이언트에서만 localStorage 동기화
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('apiKey');
      setApiKeyState(stored);
    }
  }, []);

  const setApiKey = (key: string | null) => {
    setApiKeyState(key);
    if (typeof window !== 'undefined') {
      if (key) localStorage.setItem('apiKey', key);
      else localStorage.removeItem('apiKey');
    }
  };

  // storage 이벤트로 여러 탭 동기화
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sync = () => {
      const stored = localStorage.getItem('apiKey');
      setApiKeyState(stored);
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
}
