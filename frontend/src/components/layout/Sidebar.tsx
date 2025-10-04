import { DocumentUploader } from '../upload/DocumentUploader';
import { RiFileUploadLine } from 'react-icons/ri';
import { useChatStore } from '../../store/chatStore';
import { clsx } from 'clsx';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const conversations = useChatStore(s => s.history);
  return (
    <aside
      className={clsx(
        'z-20 flex flex-col bg-white/80 dark:bg-neutral-900/70 backdrop-blur border-r border-neutral-200 dark:border-neutral-800 w-72 shrink-0 transition-transform duration-300',
        !open && '-translate-x-full',
        'md:translate-x-0'
      )}
    >
      <div className="p-4 flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800">
        <RiFileUploadLine className="text-brand-600" />
        <h2 className="font-semibold tracking-tight">Documents</h2>
        <button className="ml-auto md:hidden text-sm px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800" onClick={onClose}>×</button>
      </div>
      <div className="p-4 space-y-4 overflow-y-auto custom-scroll">
        <DocumentUploader />
        <div>
          <p className="text-xs uppercase tracking-wide font-medium text-neutral-500 dark:text-neutral-400 mb-2">Recent Questions</p>
          <ul className="space-y-2 text-sm">
            {conversations.slice(-8).reverse().map((c, i) => (
              <li key={i} className="line-clamp-2 text-neutral-700 dark:text-neutral-300 bg-neutral-100/70 dark:bg-neutral-800/50 px-2 py-1 rounded">
                {c.question}
              </li>
            ))}
            {conversations.length === 0 && (
              <li className="text-neutral-500 dark:text-neutral-500 italic">No queries yet.</li>
            )}
          </ul>
        </div>
      </div>
      <div className="mt-auto p-4 text-xs text-neutral-500 dark:text-neutral-500">
        <p>RAG Chatbot UI · {new Date().getFullYear()}</p>
      </div>
    </aside>
  );
}
