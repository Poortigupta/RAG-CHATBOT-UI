import { FormEvent, useState, useRef, useEffect } from 'react';
import { useChatStore } from '../../store/chatStore';
import { RiSendPlane2Fill } from 'react-icons/ri';
import ReactMarkdown from 'react-markdown';

export function ChatWindow() {
  const { history, ask, loading } = useChatStore();
  const [question, setQuestion] = useState('');
  const endRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    await ask(question.trim());
    setQuestion('');
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Only auto-scroll if user is already near bottom (avoid fighting manual scroll up)
    const gap = el.scrollHeight - el.scrollTop - el.clientHeight;
    const nearBottom = gap < 140; // px threshold
    if (nearBottom) {
      endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [history, loading]);

  return (
    <div className="flex flex-col flex-1 min-h-0 h-full">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scroll">
        {history.length === 0 && (
          <div className="max-w-xl mx-auto text-center mt-20 text-neutral-500 dark:text-neutral-400">
            <h2 className="text-lg font-semibold mb-2">Ask about your documents</h2>
            <p className="text-sm">Upload a PDF and start asking questions. Your context-aware answers will appear here.</p>
          </div>
        )}
        {history.map((h, idx) => (
          <div key={idx} className="space-y-2">
            <div className="bg-brand-600 text-white rounded-lg px-4 py-3 max-w-2xl shadow self-end ml-auto">
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{h.question}</p>
            </div>
            <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-3 max-w-2xl shadow">
              <ReactMarkdown className="prose prose-sm dark:prose-invert max-w-none">{h.answer || '…'}</ReactMarkdown>
              {h.sources?.length > 0 && (
                <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-700">
                  <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-1">Sources</p>
                  <ul className="flex flex-wrap gap-2 text-xs">
                    {h.sources.map((s,i)=>(
                      <li key={i} className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-700/50 text-neutral-600 dark:text-neutral-300">{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-sm text-neutral-500 dark:text-neutral-400 animate-pulse">Thinking…</div>
        )}
        <div ref={endRef} />
      </div>
      <form onSubmit={submit} className="border-t border-neutral-200 dark:border-neutral-800 p-4 bg-white/70 dark:bg-neutral-900/60 backdrop-blur">
        <div className="max-w-4xl mx-auto flex gap-3 items-end">
          <textarea
            value={question}
            onChange={e=>setQuestion(e.target.value)}
            placeholder="Ask a question about the uploaded documents..."
            className="flex-1 resize-none rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-500/40 px-3 py-2 text-sm leading-relaxed min-h-[60px] max-h-48 shadow-inner"
          />
          <button type="submit" disabled={!question.trim() || loading} className="h-10 px-5 rounded-md bg-brand-600 hover:bg-brand-500 disabled:opacity-40 text-white font-medium flex items-center gap-2 shadow">
            <RiSendPlane2Fill />
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
