import { useCallback, useState } from 'react';

const getInitialOrder = (
  type: 'beginning' | 'end',
  index: number,
  length: number,
) => {
  if (length === 1) return true;
  if (type === 'beginning' && length >= 2 && index === 0) return true;
  if (type === 'end' && length >= 2 && index === length - 1) return true;
  return false;
};

export default function useBoundaryIndex(activeIndex: number, length: number) {
  const [isBeginning, setIsBeginning] = useState(
    getInitialOrder('beginning', activeIndex, length),
  );
  const [isEnd, setIsEnd] = useState(
    getInitialOrder('end', activeIndex, length),
  );

  const onBoundaryUpdate = useCallback(
    (isBeginning: boolean, isEnd: boolean) => {
      setIsBeginning(isBeginning);
      setIsEnd(isEnd);
    },
    [],
  );

  return { isBeginning, isEnd, onBoundaryUpdate };
}
