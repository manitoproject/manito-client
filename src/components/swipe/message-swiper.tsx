import styled from '@emotion/styled';
import { useRef } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import CakeTextarea from '@/components/makecake/textarea';
import EmojiSkin from '@/components/rollingpaper/emoji-skin';
import SwipeNavigation from '@/components/swipe/navigation';
import TreasureBoxTextarea from '@/components/treasurebox/textarea';
import useSwipeNavigation from '@/hooks/use-swipe-navigation';
import { findSvgByThemeName } from '@/lib/cake-decoration';
import { findTreasureByName } from '@/lib/treasure-box';
import { getFontSizeAndWeight } from '@/styles/mixins';
import { Message } from '@/types/message';

interface DetailSwiperProps {
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
              <EmojiSkin message={message}>
                {Svg && <Svg />}
                <p>{message.content}</p>
              </EmojiSkin>
            </SwiperSlide>
          );
        } else if (category === 'cake') {
          return (
            <StyledSlide key={message.id}>
              <CakeTextarea
                content={message.content}
                fontName={message.font}
                themeName={message.theme}
              />
            </StyledSlide>
          );
        } else {
          const treasure = findTreasureByName(message?.theme);
          return (
            <SwiperSlide key={message.id}>
              <StyledSvgWrapper>
                {treasure && <treasure.svg width={203} height={203} />}
                <StyledTitleWrapper>
                  <StyledTitle>{treasure?.title}</StyledTitle>
                  <StyledDesc>
                    진실된 내 모습을 마주보고 용기를 얻을 수 있어요.
                  </StyledDesc>
                </StyledTitleWrapper>
              </StyledSvgWrapper>
              <TreasureBoxTextarea value={message.content} />
            </SwiperSlide>
          );
        }
      })}
      <SwipeNavigation
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
const StyledSvgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 12px;
  align-items: center;
  flex-direction: column;
`;

const StyledTitle = styled.p`
  border-radius: 99px;
  padding: 8px 32px;
  width: fit-content;
  ${getFontSizeAndWeight('heading1', 'bold')};
  font-family: ${({ theme }) => theme.fontFamily.Cafe24Ohsquare};
  color: ${({ theme }) => theme.colors.white};
  text-shadow: 0px 4px 4px #19807a;
  border: 2px solid var(--color-teal-teal500, #19807a);
  background: var(--color-teal-teal300, #7abaab);
  box-shadow: 2px 2px 8px 0px #19807a inset;
`;

const StyledDesc = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fontFamily.SpoqaHanSansNeo};
  ${getFontSizeAndWeight('heading4', 'bold')};
`;
