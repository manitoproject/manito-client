import { create } from 'zustand';

interface ToastStore {
  toast: Array<string>;
  add: (message: string) => void;
}

const delay = 2000;
const toastStore = create<ToastStore>((set) => ({
  toast: [],
  add: (message: string) => {
    set((state) => {
      setTimeout(() => {
        set((state) => ({ toast: state.toast.slice(1) }));
      }, delay);
      return { toast: [...state.toast, message] };
    });
  },
}));

export default toastStore;
