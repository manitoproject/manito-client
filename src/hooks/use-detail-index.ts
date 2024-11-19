import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Message } from '@/types/message';

export default function useDetailIndex(
  messages?: Message<UserIdAndNickname>[],
) {
  const [searchParams] = useSearchParams();
  const messageId = searchParams.get('id');
  const initialIndex =
    messages?.findIndex((item) => item.id === Number(messageId)) ?? -1;
  const [activeIndex, setActiveIndex] = useState(
    initialIndex === -1 ? 0 : initialIndex,
  );

  return { activeIndex, setActiveIndex };
}
