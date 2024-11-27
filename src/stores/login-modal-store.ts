import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface LoginModalStore {
  isOpen: boolean;
  actions: {
    toggleOpen: (status: boolean) => void;
  };
}

const useLoginModalStore = create<LoginModalStore>()(
  devtools((set) => ({
    isOpen: false,
    actions: {
      toggleOpen: (status: boolean) => set({ isOpen: status }),
    },
  })),
);

export const useLoginModal = () => useLoginModalStore((state) => state.isOpen);
export const useLoginModalActions = () =>
  useLoginModalStore((state) => state.actions);
