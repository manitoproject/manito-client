import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ModalStore {
  activeIndex: number;
  actions: {
    setActiveIndex: (i: number) => void;
  };
}

const useModalStore = create<ModalStore>()(
  devtools((set) => ({
    activeIndex: 0,
    actions: {
      setActiveIndex: (i: number) => set({ activeIndex: i }),
    },
  })),
);

export const useModalIndex = () => useModalStore((state) => state.activeIndex);
export const useModalActions = () => useModalStore((state) => state.actions);
