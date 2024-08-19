import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Message } from '../types/message';

const INIT_LIST = Array(8).fill(null);
const MAX_LIST_LENGTH = 56;

interface MessageState {
  list: Array<null | Message<unknown>>;
  actions: {
    snycList: (serverData?: Message<unknown>[]) => void;
    reset: () => void;
    hasList: () => boolean;
  };
}

const useMessageStore = create<MessageState>()(
  devtools((set, get) => ({
    list: INIT_LIST,
    actions: {
      hasList: () => {
        return get().list.some((item) => {
          return item?.theme && 'id' in item;
        });
      },

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
      reset: () =>
        set({
          list: INIT_LIST,
        }),
    },
  })),
);

export const useMessageList = () => useMessageStore((state) => state.list);

export const useMessageActions = () =>
  useMessageStore((state) => state.actions);
