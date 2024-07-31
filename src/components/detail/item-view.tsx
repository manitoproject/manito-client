import 'swiper/css';

import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import { RightChevron } from '../../assets/svg/icons';
import { findEmojiForTheme } from '../../constants/emojis';
import { Font, fonts } from '../../constants/fonts';
import { usePaperMessagesQuery } from '../../queries/message';
import { useUserQuery } from '../../queries/users';
import { StyledEmojiWrapper } from '../../routes/rolling-new.style';
import theme from '../../styles/theme';
import { Button } from '../common/buttons';
import ItemViewUserForm from './item-view-user-form';

interface ItemViewProps {
  onCloseItemView: () => void;
  paperId?: number;
}

export default function ItemView({ onCloseItemView, paperId }: ItemViewProps) {
  const { data: messageData } = usePaperMessagesQuery(paperId);
  const { data: userData } = useUserQuery();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(
    activeIndex === 0 ? true : false,
  );
  const [isEnd, setIsEnd] = useState(
    messageData?.data?.length === 1 ? true : false,
  );
  const swiperRef = useRef<SwiperType>();

  const handleSlideChange = (e: SwiperType) => {
    setIsEnd(e.isEnd);
    setIsBeginning(e.isBeginning);
    setActiveIndex(e.activeIndex);
  };
  return (
    <StyledWrapper>
      <div>
        <StyledSwiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation]}
          onSlideChange={handleSlideChange}
        >
          {messageData?.data?.map((message) => {
            const emoji = findEmojiForTheme(message.theme);
            const font = fonts.find(
              (font) => font.name === message.font,
            ) as Font;
            return (
              <StyledItemEmojiWrapper key={message.id}>
                {emoji?.svg && <emoji.svg />}
                {/* <StyledItemEmojiWrapper
                type="Circle"
                font={font}
                color={message.fontColor}
              >
                <textarea
                  disabled
                  value={message.content}
                  // onChange={(e) => setMessage(e.target.value)}
                />
              </StyledItemEmojiWrapper> */}
              </StyledItemEmojiWrapper>
            );
          })}
          <StyledNavigationWarpper>
            {!isBeginning && (
              <StyledPrevNavigation
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <RightChevron />
              </StyledPrevNavigation>
            )}
            {!isEnd && (
              <StyledNextNavigation
                onClick={() => swiperRef.current?.slideNext()}
              >
                <RightChevron />
              </StyledNextNavigation>
            )}
          </StyledNavigationWarpper>
        </StyledSwiper>

        <ItemViewUserForm
          nickname={
            messageData?.data?.[activeIndex].anonymous ||
            messageData?.data?.[activeIndex].user.nickname
          }
          activeIndex={activeIndex}
          totalIndex={messageData?.data?.length}
        />
      </div>

      <StyledItemViewButtons>
        <Button
          css={{
            background: theme.colors.white,
            color: theme.colors.black,
            outline: `1px solid ${theme.colors['gray-300']}`,
          }}
          onClick={onCloseItemView}
        >
          닫기
        </Button>
        {messageData?.data?.[activeIndex].user?.id === userData?.data?.id && (
          <>
            <Button
              css={{ background: theme.colors['powderBlue-900'] }}
              onClick={onCloseItemView}
            >
              수정
            </Button>
            <Button css={{}} onClick={onCloseItemView}>
              삭제
            </Button>
          </>
        )}
      </StyledItemViewButtons>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 50;
  justify-content: space-between;
`;
const StyledSwiper = styled(Swiper)`
  width: 100%;
  position: relative;
`;

const StyledItemViewButtons = styled.div`
  display: flex;
  gap: 8px;
`;
const StyledItemEmojiWrapper = styled(SwiperSlide)`
  width: 100%;
  svg {
    height: 432px;
    width: 100%;
  }
  /* position: relative;
  transform: none;
  textarea {
    pointer-events: none;
  } */
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
