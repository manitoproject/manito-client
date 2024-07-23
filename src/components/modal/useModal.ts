import { useState } from 'react';

export default function useModal() {
  const [isError, setIsError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  return { isError, setIsError, activeIndex, setActiveIndex };
}
