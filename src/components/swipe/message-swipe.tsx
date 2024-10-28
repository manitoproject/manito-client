import styled from '@emotion/styled';
import { useRef } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import CakeTextarea from '@/components/cake/textarea';
import EmojiSkin from '@/components/rollingpaper/emoji-skin';
import SwipeNavigation from '@/components/swipe/navigation';
import { findSvgByThemeName } from '@/constants/cake-decoration';
import useBoundaryIndex from '@/hooks/boundary-index';
import { Message } from '@/types/message';

interface DetailSwiperProps {
  messages: Message<UserIdAndNickname>[];
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  category: CategoryLowerCase;
}

export default function MessageSwipe({
  messages,
  activeIndex,
  setActiveIndex,
  category,
}: DetailSwiperProps) {
  const swiperRef = useRef<SwiperType>();

  const { isBeginning, isEnd, onBoundaryUpdate } = useBoundaryIndex(
    activeIndex,
    messages.length,
  );

  const handleSlideChange = (e: SwiperType) => {
    const { isBeginning, isEnd, activeIndex } = e;
    onBoundaryUpdate(isBeginning, isEnd);
    setActiveIndex(activeIndex);
  };

  return (
    <StyledSwiper
      initialSlide={activeIndex}
      onBeforeInit={(swiper) => {
        swiperRef.current = swiper;
      }}
      modules={[Navigation]}
      onSlideChange={handleSlideChange}
    >
      {messages?.map((message) => {
        if (category === 'rollingpaper') {
          const Svg = findSvgByThemeName(message.theme);
          return (
            <SwiperSlide key={message.id}>
              <EmojiSkin message={message}>
                {Svg && <Svg />}
                <p>{message.content}</p>
              </EmojiSkin>
            </SwiperSlide>
          );
        }
        return (
          <SwiperSlide key={message.id}>
            <CakeTextarea
              content={message.content}
              fontName={message.font}
              themeName={message.theme}
            />
          </SwiperSlide>
        );
      })}
      <SwipeNavigation
        isBeginning={isBeginning}
        isEnd={isEnd}
        onSlidePrev={() => swiperRef.current?.slidePrev()}
        onSlideNext={() => swiperRef.current?.slideNext()}
      />
    </StyledSwiper>
  );
}

const StyledSwiper = styled(Swiper)`
  width: 100%;
  position: relative;
`;
