export const fetcher = async (url: string, options: RequestInit = {}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
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
