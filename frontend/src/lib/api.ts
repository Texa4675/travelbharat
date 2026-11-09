const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, '');

export async function apiRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  if (!apiBaseUrl) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not configured.');
  }

  const headers = new Headers(init?.headers);
  headers.set('Accept', 'application/json');

  const response = await fetch(
    `${apiBaseUrl}/${path.replace(/^\/+/, '')}`,
    {
      ...init,
      headers,
    },
  );

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}.`);
  }

  return response.json() as Promise<T>;
}
