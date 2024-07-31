import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ToastStore {
  toast: Array<string>;
  add: (message: string) => void;
}

const delay = 2000;
const useToastStore = create<ToastStore>()(
  devtools((set) => ({
    toast: [],
    add: (message: string) => {
      set((state) => {
        setTimeout(() => {
          set((state) => ({ toast: state.toast.slice(1) }));
        }, delay);
        return { toast: [...state.toast, message] };
      });
    },
  })),
);

export default useToastStore;
