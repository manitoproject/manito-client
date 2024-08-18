import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface MessageScreenStore {
  activeIndex: number;
  isVisible: boolean;
  actions: {
    close: () => void;
    open: () => void;
    setActiveIndex: (i: number) => void;
    resetActiveIndex: () => void;
  };
}

const initial_index = 0;

const useMessageScreenStore = create<MessageScreenStore>()(
  devtools((set) => ({
    isVisible: false,
    activeIndex: initial_index,
    actions: {
      close: () => set({ isVisible: false }),
      open: () => set({ isVisible: true }),
      setActiveIndex: (i: number) => set({ activeIndex: i }),
      resetActiveIndex: () => set({ activeIndex: initial_index }),
    },
  })),
);

export const useMessageScreenActions = () =>
  useMessageScreenStore((state) => state.actions);
export const useMessageScreenIndex = () =>
  useMessageScreenStore((state) => state.activeIndex);
export const useMessageScreenVisible = () =>
  useMessageScreenStore((state) => state.isVisible);
