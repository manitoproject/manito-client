import { useEffect } from 'react';

export default function useDisableScroll(status: boolean) {
  useEffect(() => {
    if (status) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [status]);
}
