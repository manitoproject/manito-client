import { useEffect } from 'react';

import { SetHeaderStore, useHeaderActions } from '@/stores/header-store';

export default function useSetHeader({
  bg,
  color,
  font,
  leftBtn,
  rightBtn,
  title,
}: SetHeaderStore) {
  const { setHeader } = useHeaderActions();
  useEffect(() => {
    setHeader({ bg, color, font, leftBtn, rightBtn, title });
  }, [bg, color, font, leftBtn, rightBtn, setHeader, title]);
}
