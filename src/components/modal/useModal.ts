import { useState } from 'react';

export default function useModal() {
  const [isError, setIsError] = useState(false);

  return { isError, setIsError };
}
