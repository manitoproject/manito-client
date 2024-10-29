import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { usePaperMessagesQuery } from '@/queries/message';

export default function useMessageDetail() {
  const { data: messages } = usePaperMessagesQuery();

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const foundIndex = id && messages?.findIndex((item) => item.id === +id);
  const [activeIndex, setActiveIndex] = useState(
    !foundIndex || foundIndex === -1 ? 0 : foundIndex,
  );

  return {
    activeIndex,
    setActiveIndex,
    messages,
  };
}
