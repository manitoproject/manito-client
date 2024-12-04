import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SwiperClass } from 'swiper/react';

import { Message } from '@/types/message';

const getIndex = (id: number, messages?: Message<UserIdAndNickname>[]) => {
  const index = messages?.findIndex((messages) => messages.id === id) ?? 0;
  return index === -1 ? 0 : index;
};

export default function useSwiperNavigation(
  swiper?: SwiperClass,
  messages?: Message<UserIdAndNickname>[],
) {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get('id'));
  const [activeIndex, setActiveIndex] = useState(getIndex(id, messages));

  const onActiveIndexChange = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (messages?.length && id && swiper) {
      swiper.slideTo(getIndex(id, messages));
    }
  }, [id, messages, swiper]);

  return { activeIndex, onActiveIndexChange };
}
