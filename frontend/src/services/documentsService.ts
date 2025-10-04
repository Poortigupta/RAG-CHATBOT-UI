import { api } from './apiClient';

export interface IngestResponse {
  status: string;
  saved_file?: string;
  documents?: number;
  chunks?: number;
}

export async function uploadDocument(file: File): Promise<IngestResponse> {
  const form = new FormData();
  form.append('file', file);
  const { data } = await api.post('/ingest/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
}
