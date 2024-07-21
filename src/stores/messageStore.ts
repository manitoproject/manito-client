import { create } from 'zustand';

import emojis from '../constants/emojis';
import { ThemeKey } from '../constants/theme-list';
import { Message } from '../types/message';

const INIT_LIST = Array(8).fill(null);

interface MessageState {
  list: Array<null | Message | Pick<Message, 'theme'>>;
  activeEmojiIndex: null | number;
  activeMessageIndex: null | number;
  setActiveEmojiIndex: (i: number | null) => void;
  setActiveMessageIndex: (i: number | null) => void;
  snycList: (serverData?: Message[]) => void;
  addList: (theme: ThemeKey) => void;
  reset: () => void;
  removeList: (messageId: number) => void;
}

const messageStore = create<MessageState>((set) => ({
  list: INIT_LIST,
  activeEmojiIndex: null,
  activeMessageIndex: null,
  setActiveEmojiIndex: (i: number | null) => set({ activeEmojiIndex: i }),
  setActiveMessageIndex: (i: number | null) => set({ activeMessageIndex: i }),
  snycList: (serverData?: Message[]) =>
    set((state) => ({
      list: state.list.map((prev, i) => {
        return serverData?.[i] ?? prev;
      }),
    })),
  addList: (theme: ThemeKey) =>
    set((state) => ({
      list: state.list.map((prev, i) => {
        if (state.activeMessageIndex === i && state.activeEmojiIndex !== null) {
          return {
            theme: emojis[theme][state.activeEmojiIndex].name,
          };
        }
        if (prev?.theme && !('content' in prev)) {
          return null;
        }
        return prev;
      }),
    })),
  removeList: (messageId: number) =>
    set((state) => ({
      list: state.list.map((prev) => {
        if (prev?.theme && 'content' in prev) {
          return prev.id === messageId ? null : prev;
        }
        return prev;
      }),
    })),
  reset: () =>
    set({
      list: INIT_LIST,
      activeMessageIndex: null,
      activeEmojiIndex: null,
    }),
}));

export default messageStore;
