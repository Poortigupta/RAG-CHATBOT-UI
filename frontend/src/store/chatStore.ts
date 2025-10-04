import { create } from 'zustand';
import { askQuestion, QueryResponse } from '../services/chatService';
import { getHealth, Health } from '../services/apiClient';

interface QAEntry {
  question: string;
  answer: string;
  sources: string[];
  hits: { score: number; source?: string; page?: number }[];
  createdAt: number;
  error?: boolean;
}

interface ChatState {
  history: QAEntry[];
  loading: boolean;
  stats?: Health;
  ask: (q: string) => Promise<void>;
  refreshStats: () => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  history: [],
  loading: false,
  stats: undefined,
  ask: async (q: string) => {
    set({ loading: true });
    try {
      const res: QueryResponse = await askQuestion(q);
      set({
        history: [
          ...get().history,
          { question: q, answer: res.response, sources: res.sources, hits: res.hits, createdAt: Date.now() }
        ]
      });
    } catch (e: any) {
      set({
        history: [
          ...get().history,
          { question: q, answer: `Error: ${e?.message || 'Failed to get answer'}`, sources: [], hits: [], createdAt: Date.now(), error: true }
        ]
      });
    } finally {
      set({ loading: false });
    }
  },
  refreshStats: async () => {
    try {
      const stats = await getHealth();
      set({ stats });
    } catch {
      /* ignore */
    }
  }
}));
