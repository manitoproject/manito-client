import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import DetailActionButtons from '@/components/detail/action-buttons';
import DetailAuthorInfo from '@/components/detail/author-info';
import RollingpaperEmojiSkin from '@/components/rollingpaper/emoji-skin';
import SwiperNavigation from '@/components/swiper/navigation';
import ReactHelmet, { TITLE } from '@/helmet';
import useSetHeader from '@/hooks/use-set-header';
import useSwiperNavigation from '@/hooks/use-swiper-navigation';
import { findImgByThemeName } from '@/lib/common';
import { messageQueries, paperQueries } from '@/lib/query-factory';
import { ROLLINGPAPER_BG_MAP } from '@/lib/rolling-paper';
import { StyledBackdrop } from '@/pages/rollingpaper/list.style';

export default function RollingpaperDetail() {
  const params = useParams();
  const [swiper, setSwiper] = useState<SwiperClass>();
  const { data: messages } = useQuery(messageQueries.paper(Number(params.id)));
  const { data: paper } = useQuery(paperQueries.detail(Number(params.id)));
  const { activeIndex, onActiveIndexChange } = useSwiperNavigation(
    swiper,
    messages,
  );
  useSetHeader({
    title: paper?.title,
    bg: ROLLINGPAPER_BG_MAP[paper?.theme ?? 'animal'].bgColor,
    color: paper?.theme === 'animal' ? undefined : 'white',
  });

  if (!messages?.length) return null;
  const currentMessage = messages[activeIndex];

  return (
    <StyledWrapper>
      <div>
        <StyledSwiper
          onSlideChange={(e) => onActiveIndexChange(e.activeIndex)}
          spaceBetween={20}
          onSwiper={setSwiper}
          modules={[Navigation]}
        >
          {messages.map((message) => (
            <SwiperSlide key={message.id}>
              <RollingpaperEmojiSkin message={message}>
                <img
                  src={findImgByThemeName(message.theme)}
                  alt={message.theme}
                />
                <p>{message.content}</p>
              </RollingpaperEmojiSkin>
            </SwiperSlide>
          ))}
          <SwiperNavigation />
        </StyledSwiper>
        <DetailAuthorInfo hasPadding>
          <DetailAuthorInfo.Nickname
            nickname={
              currentMessage?.anonymous || currentMessage?.user?.nickname
            }
          />
          <DetailAuthorInfo.PageLength
            currentIndex={activeIndex}
            totalIndex={messages?.length}
          />
        </DetailAuthorInfo>
      </div>
      <DetailActionButtons
        category="rollingpaper"
        paperAuthorId={paper?.userId}
        message={currentMessage}
      />
      <ReactHelmet title={`${paper?.title} - ${TITLE}`} />
      <StyledBackdrop
        bg={ROLLINGPAPER_BG_MAP[paper?.theme ?? 'animal'].bgUrl}
      />
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > div:nth-of-type(1) {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.sizes.paddingTop};
  }
`;

const StyledSwiper = styled(Swiper)`
  margin: 0;
`;
