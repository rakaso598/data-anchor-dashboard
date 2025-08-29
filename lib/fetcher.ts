export const fetcher = async (url: string, options: RequestInit = {}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  let apiKey: string | null = null;
  if (typeof window !== 'undefined') {
    apiKey = window.localStorage.getItem('apiKey');
  }
  const res = await fetch(apiUrl + url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      'Content-Type': 'application/json',
      ...(apiKey ? { 'x-api-key': apiKey } : {}),
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};
