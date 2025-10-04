import { useState, ChangeEvent, FormEvent } from 'react';
import { uploadDocument } from '../../services/documentsService';
import { RiUploadCloud2Line } from 'react-icons/ri';
import { useChatStore } from '../../store/chatStore';

interface Props { inline?: boolean }

export function DocumentUploader({ inline }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle'|'uploading'|'success'|'error'>('idle');
  const [message, setMessage] = useState<string>('');
  const refreshStats = useChatStore(s => s.refreshStats);

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setStatus('uploading');
    setMessage('Uploading...');
    try {
      const res = await uploadDocument(file);
      setStatus('success');
      setMessage(`Uploaded. Chunks: ${res.chunks}`);
      refreshStats();
      setFile(null);
    } catch (err: any) {
      setStatus('error');
      setMessage(err?.message || 'Upload failed');
    }
  };

  const base = (
    <form onSubmit={onSubmit} className={inline ? 'flex items-center gap-2' : 'space-y-3'}>
      <label className="flex items-center gap-2 text-sm font-medium cursor-pointer px-3 py-2 rounded border border-dashed border-brand-400/60 bg-brand-50 hover:bg-brand-100 dark:border-brand-500/40 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors">
        <RiUploadCloud2Line className="text-brand-600" />
        <span>{file ? file.name : 'Select PDF'}</span>
        <input type="file" accept="application/pdf" onChange={onFile} className="hidden" />
      </label>
      <button type="submit" disabled={!file || status==='uploading'} className="text-sm px-3 py-2 rounded bg-brand-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-500 transition-colors shadow">
        {status==='uploading' ? 'Uploading...' : 'Upload'}
      </button>
      {message && <span className={`text-xs ${status==='error' ? 'text-red-500' : 'text-neutral-500 dark:text-neutral-400'}`}>{message}</span>}
    </form>
  );

  if (inline) return base;
  return (
    <div className="space-y-2">
      <h3 className="font-medium text-sm tracking-wide text-neutral-600 dark:text-neutral-300">Add Documents</h3>
      {base}
    </div>
  );
}
