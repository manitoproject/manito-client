import { create } from 'zustand';

import { ColorName, FontNameWithoutAppleFont } from '@/styles/theme';

export type SetHeaderStore = Partial<HeaderStore['title']>;
export interface HeaderStore {
  title: {
    title: string;
    leftBtn: boolean;
    rightBtn: boolean;
    font: FontNameWithoutAppleFont;
    bg: ColorName;
    color: ColorName;
  };
  actions: {
    setHeader: (params: SetHeaderStore) => void;
  };
}

const useHeaderStore = create<HeaderStore>((set) => ({
  title: {
    font: 'SpoqaHanSansNeo',
    bg: 'white',
    leftBtn: true,
    rightBtn: true,
    title: '마니또',
    color: 'gray-800',
  },
  actions: {
    setHeader: ({
      title = '마니또',
      rightBtn = true,
      leftBtn = true,
      font = 'SpoqaHanSansNeo',
      color = 'gray-800',
      bg = 'white',
    }) => set({ title: { leftBtn, rightBtn, title, font, bg, color } }),
  },
}));

export const useHeader = () => useHeaderStore((state) => state.title);
export const useHeaderActions = () => useHeaderStore((state) => state.actions);
