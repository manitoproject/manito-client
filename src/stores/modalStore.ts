import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ModalStore {
  activeIndex: number;
  setActiveIndex: (i: number) => void;
}

const useModalStore = create<ModalStore>()(
  devtools((set) => ({
    activeIndex: 0,
    setActiveIndex: (i: number) => set({ activeIndex: i }),
  })),
);

export default useModalStore;
