import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type Message = {
  position: number | null;
  decoration: string | null;
  bg: string | null;
};

interface CakeMessageStore {
  message: Message;
  actions: {
    reset: () => void;
    setInfo: (info: Partial<Message>) => void;
  };
}

const useCakeMessageStore = create<CakeMessageStore>()(
  devtools((set) => ({
    message: { bg: null, decoration: null, position: null },
    actions: {
      reset: () =>
        set({ message: { bg: null, decoration: null, position: null } }),
      setInfo: (info: Partial<Message>) =>
        set((state) => ({
          message: { ...state.message, ...info },
        })),
    },
  })),
);

export const useCakeMessageInfo = () =>
  useCakeMessageStore((state) => state.message);
export const useCakeMessageActions = () =>
  useCakeMessageStore((state) => state.actions);
