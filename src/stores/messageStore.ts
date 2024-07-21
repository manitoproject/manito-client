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
  setList: (serverData?: Message[]) => void;
  addList: (theme: ThemeKey) => void;
  resetList: () => void;
  removeList: (messageId: number) => void;
}

const messageStore = create<MessageState>((set) => ({
  list: INIT_LIST,
  activeEmojiIndex: null,
  activeMessageIndex: null,
  setActiveEmojiIndex: (i: number | null) => set({ activeEmojiIndex: i }),
  setActiveMessageIndex: (i: number | null) => set({ activeMessageIndex: i }),
  setList: (serverData?: Message[]) =>
    set((state) => ({
      list: state.list.map((prev, i) => {
        return serverData?.[i] ?? prev;
      }),
    })),
  addList: (theme: ThemeKey) =>
    set((state) => ({
      list: state.list.map((prev, i) => {
        if (prev?.theme && !('content' in prev)) {
          return null;
        }
        if (state.activeMessageIndex === i && state.activeEmojiIndex !== null) {
          return {
            theme: emojis[theme][state.activeEmojiIndex].name,
          };
        }
        return prev;
      }),
    })),
  resetList: () =>
    set({
      list: INIT_LIST,
    }),
  removeList: (messageId: number) =>
    set((state) => ({
      list: state.list.map((prev) => {
        if (prev?.theme && 'content' in prev) {
          return prev.id === messageId ? null : prev;
        }
        return prev;
      }),
    })),
}));

export default messageStore;
