import { create } from 'zustand';

interface ModalStore {
  activeIndex: number;
  setActiveIndex: (i: number) => void;
}

const modalStore = create<ModalStore>((set) => ({
  activeIndex: 0,
  setActiveIndex: (i: number) => set({ activeIndex: i }),
}));

export default modalStore;
