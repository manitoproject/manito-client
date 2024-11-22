import styled from '@emotion/styled';
import { useRef } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import CakeTextarea from '@/components/makecake/textarea';
import EmojiSkin from '@/components/rollingpaper/emoji-skin';
import SwipeNavigation from '@/components/swipe/navigation';
import useSwipeNavigation from '@/hooks/use-swipe-navigation';
import { findSvgByThemeName } from '@/lib/cake-decoration';
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

  const { isBeginning, isEnd, updateSlideStatus } = useSwipeNavigation(
    activeIndex,
    messages.length,
  );

  const handleSlideChange = (e: SwiperType) => {
    const { isBeginning, isEnd, activeIndex } = e;
    updateSlideStatus(isBeginning, isEnd);
    setActiveIndex(activeIndex);
  };

  return (
    <StyledSwiper
      isCakeTheme={category === 'cake'}
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
          <StyledSlide key={message.id}>
            <CakeTextarea
              content={message.content}
              fontName={message.font}
              themeName={message.theme}
            />
          </StyledSlide>
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

const StyledSwiper = styled(Swiper)<{ isCakeTheme?: boolean }>`
  width: 100%;
  position: relative;
  height: ${({ isCakeTheme }) => isCakeTheme && '310px'};
`;

const StyledSlide = styled(SwiperSlide)`
  display: flex;
  align-items: end;
`;
