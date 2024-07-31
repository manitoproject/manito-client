import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ToastStore {
  toast: Array<{ id: string; message: string }>;
  add: (message: string) => void;
}

const delay = 2000;
const useToastStore = create<ToastStore>()(
  devtools((set) => ({
    toast: [],
    add: (message: string) => {
      const id = Math.random().toString(32).slice(2, 9);
      set((state) => {
        setTimeout(() => {
          set((state) => ({
            toast: state.toast.filter((item) => item.id !== id),
          }));
        }, delay);
        return { toast: [...state.toast, { id, message }] };
      });
    },
  })),
);

export default useToastStore;
