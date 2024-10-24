import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRef } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import SwipeNavigation from '@/components/swipe/swipe-navigation';
import { useBoundaryIndex } from '@/hooks';
import { THEME_PALETTES } from '@/routes/cake/list';

interface CakeSwipeProps {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function CakeSwipe({
  activeIndex,
  setActiveIndex,
}: CakeSwipeProps) {
  const swiperRef = useRef<SwiperType>();

  const { isBeginning, isEnd, onBoundaryUpdate } = useBoundaryIndex(
    activeIndex,
    THEME_PALETTES.length,
  );
  const handleSlideChange = (e: SwiperType) => {
    const { isBeginning, isEnd, activeIndex } = e;
    onBoundaryUpdate(isBeginning, isEnd);
    setActiveIndex(activeIndex);
  };
  return (
    <>
      <StyledSwiper
        initialSlide={activeIndex}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        resistanceRatio={0.1}
        onSlideChange={handleSlideChange}
        modules={[Navigation]}
      >
        {THEME_PALETTES.map((theme) => (
          <SwiperSlide key={theme.bgUrl}>
            <img src={theme.bgUrl} alt={theme.bgUrl} />
          </SwiperSlide>
        ))}
      </StyledSwiper>
      <SwipeNavigation
        isBeginning={isBeginning}
        isEnd={isEnd}
        onSlideNext={() => swiperRef.current?.slideNext()}
        onSlidePrev={() => swiperRef.current?.slidePrev()}
      />
    </>
  );
}
const StyledSwiper = styled(Swiper)`
  ${({ theme }) => css`
    position: absolute;
    top: -${theme.sizes.header};
    height: 100vh;
    width: ${theme.sizes.mobile};
    transform: ${`translateX(-${theme.sizes.padding})`};
  `}
`;
