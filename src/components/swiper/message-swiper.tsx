import styled from '@emotion/styled';
import { useRef } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import MakeCakeTextarea from '@/components/makecake/textarea';
import RollingpaperEmojiSkin from '@/components/rollingpaper/emoji-skin';
import SwiperNavigation from '@/components/swiper/navigation';
import TreasureBoxSlide from '@/components/swiper/treasurebox-slide';
import useSwipeNavigation from '@/hooks/use-swipe-navigation';
import { findSvgByThemeName } from '@/lib/cake-decoration';
import { Message } from '@/types/message';

interface SwipeMessageSwiperProps {
  messages: Message<UserIdAndNickname>[];
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  category: CategoryLowerCase;
}

export default function MessageSwiper({
  messages,
  activeIndex,
  setActiveIndex,
  category,
}: SwipeMessageSwiperProps) {
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
    <Swiper
      spaceBetween={20}
      css={{ margin: 0, height: category === 'cake' ? '310px' : 'auto' }}
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
              <RollingpaperEmojiSkin message={message}>
                {Svg && <Svg />}
                <p>{message.content}</p>
              </RollingpaperEmojiSkin>
            </SwiperSlide>
          );
        } else if (category === 'cake') {
          return (
            <StyledSlide key={message.id}>
              <MakeCakeTextarea
                content={message.content}
                fontName={message.font}
                themeName={message.theme}
              />
            </StyledSlide>
          );
        } else {
          return (
            <SwiperSlide key={message.id}>
              <TreasureBoxSlide message={message} />
            </SwiperSlide>
          );
        }
      })}
      <SwiperNavigation
        isBeginning={isBeginning}
        isEnd={isEnd}
        onSlidePrev={() => swiperRef.current?.slidePrev()}
        onSlideNext={() => swiperRef.current?.slideNext()}
      />
    </Swiper>
  );
}

const StyledSlide = styled(SwiperSlide)`
  display: flex;
  align-items: end;
`;
