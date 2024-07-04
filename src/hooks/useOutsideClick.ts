import { useEffect, useRef } from 'react';

export default function useOutsideClick(callback: () => void, status: boolean) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!status) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mouseup', handleClickOutside);
    document.addEventListener('touchend', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside);
    };
  }, [callback, status]);

  return ref;
}
