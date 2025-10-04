import axios from 'axios';

// Strictly read backend base URL from environment so secrets / deployed URL are not hardcoded.
// Create a .env file with VITE_API_URL=... (never commit the real value if private).
let baseURL = import.meta.env.VITE_API_URL as string | undefined;

if (!baseURL) {
  // Provide a dev-friendly message while refusing to silently leak a production URL.
  console.warn('[apiClient] VITE_API_URL not set. Falling back to http://localhost:8000 for local development.');
  baseURL = 'http://localhost:8000';
}
export const api = axios.create({ baseURL });

export interface Health {
  status: string;
  provider?: string;
  chat_provider?: string;
  chat_model?: string;
  vectors?: number;
}

export async function getHealth(): Promise<Health> {
  const { data } = await api.get('/health');
  return data;
}
