import { useCallback, useState } from 'react';

export default function useSwipeNavigation(
  activeIndex: number,
  length: number,
) {
  const isAlone = length === 1;
  const [isBeginning, setIsBeginning] = useState(isAlone || !activeIndex);
  const [isEnd, setIsEnd] = useState(isAlone || activeIndex === length - 1);

  const updateSlideStatus = useCallback(
    (isBeginning: boolean, isEnd: boolean) => {
      setIsBeginning(isBeginning);
      setIsEnd(isEnd);
    },
    [],
  );

  return { isBeginning, isEnd, updateSlideStatus };
}
