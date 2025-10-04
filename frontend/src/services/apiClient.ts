import axios from 'axios';


const baseURL = import.meta.env.VITE_API_URL || 'https://rag-chatbot-f5lu.onrender.com';
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
