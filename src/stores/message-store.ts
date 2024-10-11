import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Message } from '@/types/message';

const INIT_LIST = Array(8).fill(null);
const MAX_LIST_LENGTH = 56;

interface MessageState {
  list: Array<null | Message<unknown>>;
  actions: {
    snycList: (serverData?: Message<unknown>[]) => void;
    reset: () => void;
  };
}

const useMessageStore = create<MessageState>()(
  devtools((set) => ({
    list: INIT_LIST,
    actions: {
      snycList: (serverData?: Message<unknown>[]) =>
        set((state) => {
          if (!serverData?.length) return { list: state.list };
          const neededLength = Math.ceil(serverData.length / 8) * 8;
          let newList: Array<null | Message<unknown>> =
            Array(neededLength).fill(null);
          serverData.forEach((item) => {
            newList[item.position] = item;
          });

          if (!newList.includes(null) && newList.length % 8 === 0) {
            newList = [...newList, ...INIT_LIST];
          }

          if (newList.length > MAX_LIST_LENGTH) {
            newList = newList.slice(0, MAX_LIST_LENGTH);
          }
          return { list: newList };
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
