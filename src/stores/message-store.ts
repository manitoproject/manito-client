import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type Message = {
  position: number | null;
  theme: string | null;
  bg: string | null;
};

interface CakeMessageStore {
  message: Message;
  actions: {
    reset: () => void;
    setInfo: (info: Partial<Message>) => void;
  };
}

const useMessageStore = create<CakeMessageStore>()(
  devtools((set) => ({
    message: {
      bg: null,
      theme: null,
      position: null,
    },
    actions: {
      reset: () =>
        set({
          message: {
            bg: null,
            theme: null,
            position: null,
          },
        }),
      setInfo: (info: Partial<Message>) =>
        set((state) => ({
          message: { ...state.message, ...info },
        })),
    },
  })),
);

export const useMessageInfo = () => useMessageStore((state) => state.message);
export const useMessageActions = () =>
  useMessageStore((state) => state.actions);
