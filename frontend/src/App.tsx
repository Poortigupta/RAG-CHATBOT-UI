import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { ChatWindow } from './components/chat/ChatWindow';
import { DocumentUploader } from './components/upload/DocumentUploader';
import { ThemeToggle } from './components/common/ThemeToggle';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 min-h-0">
        <header className="h-14 shrink-0 border-b bg-white/70 dark:bg-neutral-900/60 backdrop-blur flex items-center px-4 gap-4">
          <button
            className="md:hidden p-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800"
            onClick={() => setSidebarOpen(o => !o)}
            aria-label="Toggle sidebar"
          >☰</button>
          <h1 className="font-semibold tracking-tight text-lg">RAG Chatbot</h1>
          <div className="ml-auto flex items-center gap-3">
            <DocumentUploader inline />
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 flex flex-col min-h-0">
          <ChatWindow />
        </main>
      </div>
    </div>
  );
}
