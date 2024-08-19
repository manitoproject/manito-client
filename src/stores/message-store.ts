import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Message } from '../types/message';

const INIT_LIST = Array(8).fill(null);
const MAX_LIST_LENGTH = 56;

interface MessageState {
  list: Array<null | Message<unknown>>;
  activeEmojiName: string | null;
  activeMessageIndex: null | number;
  actions: {
    setActiveEmojiName: (i: string | null) => void;
    setActiveMessageIndex: (i: number | null) => void;
    snycList: (serverData?: Message<unknown>[]) => void;
    addList: (theme: RollingThemeName) => void;
    reset: () => void;
    hasList: () => boolean;
  };
}

const useMessageStore = create<MessageState>()(
  devtools((set, get) => ({
    list: INIT_LIST,
    activeEmojiName: null,
    activeMessageIndex: null,
    actions: {
      hasList: () => {
        return get().list.some((item) => {
          return item?.theme && 'id' in item;
        });
      },
      setActiveEmojiName: (name: string | null) =>
        set({ activeEmojiName: name }),
      setActiveMessageIndex: (i: number | null) =>
        set({ activeMessageIndex: i }),
      snycList: (serverData?: Message<unknown>[]) =>
        set((state) => {
          if (!serverData?.length) return { list: state.list };
          const currentLength = state.list.length;
          const serverDataLength = serverData.length;
          const additionalData = Array(
            currentLength - Math.ceil(serverDataLength / 8),
          ).fill(null);
          let newList = [...state.list];
          if (
            serverDataLength >= currentLength &&
            serverDataLength < MAX_LIST_LENGTH
          ) {
            if (serverDataLength % 8 !== 0) {
              newList = [...serverData, ...additionalData];
            } else {
              newList = [...serverData, ...INIT_LIST];
            }
          }
          return {
            list: newList.map((prev, i) => {
              const item = serverData?.find((item) => item.position === i);
              return item ?? prev;
            }),
          };
        }),
      addList: () =>
        set((state) => ({
          list: state.list.map((prev) => {
            if (prev?.theme && !('content' in prev)) {
              return null;
            }
            return prev;
          }),
        })),
      reset: () =>
        set({
          list: INIT_LIST,
          activeMessageIndex: null,
          activeEmojiName: null,
        }),
    },
  })),
);

export const useMessageList = () => useMessageStore((state) => state.list);
export const useActiveMessageEmojiName = () =>
  useMessageStore((state) => state.activeEmojiName);
export const useActiveMessageIndex = () =>
  useMessageStore((state) => state.activeMessageIndex);
export const useMessageActions = () =>
  useMessageStore((state) => state.actions);
