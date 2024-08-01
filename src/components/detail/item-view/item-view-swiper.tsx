import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import { RightChevron } from '../../../assets/svg/icons';
import { getEmojiObjectByName } from '../../../constants/emojis';
import { Message } from '../../../types/message';
import MessageSkin from '../../message/message-skin';

interface DetailSwiperProps {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  messages: Message[];
}

export default function ItemViewSwiper({
  activeIndex,
  setActiveIndex,
  messages,
}: DetailSwiperProps) {
  const sortedMessages = messages.sort((a, b) => a.position - b.position);
  const [isBeginning, setIsBeginning] = useState(
    activeIndex === 0 ? true : false,
  );
  const [isEnd, setIsEnd] = useState(messages.length === 1 ? true : false);
  const swiperRef = useRef<SwiperType>();

  const handleSlideChange = (e: SwiperType) => {
    setIsEnd(e.isEnd);
    setIsBeginning(e.isBeginning);
    setActiveIndex(e.activeIndex);
  };

  return (
    <StyledSwiper
      onBeforeInit={(swiper) => {
        swiperRef.current = swiper;
      }}
      modules={[Navigation]}
      onSlideChange={handleSlideChange}
    >
      {sortedMessages.map((message) => {
        const emoji = getEmojiObjectByName(message.theme);
        return (
          <SwiperSlide key={message.id}>
            <MessageSkin
              ColorName={message.fontColor}
              FontName={message.font}
              theme={message.theme}
            >
              {emoji?.svg && <emoji.svg />}
              <p>{message.content}</p>
            </MessageSkin>
          </SwiperSlide>
        );
      })}
      <StyledNavigationWarpper>
        {!isBeginning && (
          <StyledPrevNavigation onClick={() => swiperRef.current?.slidePrev()}>
            <RightChevron />
          </StyledPrevNavigation>
        )}
        {!isEnd && (
          <StyledNextNavigation onClick={() => swiperRef.current?.slideNext()}>
            <RightChevron />
          </StyledNextNavigation>
        )}
      </StyledNavigationWarpper>
    </StyledSwiper>
  );
}

const StyledSwiper = styled(Swiper)`
  width: 100%;
  position: relative;
`;

const StyledNavigationWarpper = styled.div`
  button {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    background-color: ${({ theme }) => theme.colors['black']};
    border-radius: 999px;
    z-index: 50;
    top: 50%;
  }
`;
const StyledPrevNavigation = styled.button`
  transform: translateY(-50%) rotate(180deg);
  left: 0;
`;
const StyledNextNavigation = styled.button`
  transform: translateY(-50%);
  right: 0;
`;
