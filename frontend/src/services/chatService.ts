import { api } from './apiClient';

export interface QueryHit { score: number; source?: string; page?: number }
export interface QueryResponse { response: string; sources: string[]; hits: QueryHit[] }

export async function askQuestion(question: string): Promise<QueryResponse> {
  const { data } = await api.post('/answer', { question });
  return data;
}
