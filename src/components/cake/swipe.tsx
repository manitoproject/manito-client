import styled from '@emotion/styled';
import { useRef } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import SwipeNavigation from '@/components/swipe/swipe-navigation';
import { getDecorationSvg } from '@/constants/cake-decoration';
import { useBoundaryIndex } from '@/hooks';
import { usePaperMessagesQuery } from '@/queries/message';
import { THEME_PALETTES } from '@/routes/cake/list';

interface CakeSwipeProps {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function CakeSwipe({
  activeIndex,
  setActiveIndex,
}: CakeSwipeProps) {
  console.log({ activeIndex });
  const swiperRef = useRef<SwiperType>();
  const { data } = usePaperMessagesQuery();
  const { isBeginning, isEnd, onBoundaryUpdate } = useBoundaryIndex(
    activeIndex,
    THEME_PALETTES.length,
  );
  const handleSlideChange = (e: SwiperType) => {
    const { isBeginning, isEnd, activeIndex } = e;
    onBoundaryUpdate(isBeginning, isEnd);
    setActiveIndex(activeIndex);
  };

  const startIndex = activeIndex === 0 ? 0 : activeIndex === 1 ? 13 : 26;
  const endIndex = activeIndex === 0 ? 13 : activeIndex === 1 ? 26 : 39;

  const buttons = data?.data?.slice(startIndex, endIndex).map((deco) => {
    const Svg = getDecorationSvg(deco.theme);
    return (
      <button type="button" key={deco.id}>
        <Svg width={66} height={66} />
      </button>
    );
  });

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
          <StyledSlide key={theme.bgUrl}>
            <StyledDecoList>
              <div>{buttons?.slice(0, 4)}</div>
              <div>{buttons?.slice(4, 8)}</div>
              <div>{buttons?.slice(8, 13)}</div>
            </StyledDecoList>
            <img src={theme.bgUrl} alt={theme.bgUrl} />
          </StyledSlide>
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
  position: absolute;
  top: ${({ theme }) => `-${theme.sizes.paddingTop}`};
  height: ${({ theme }) => `calc(100vh - ${theme.sizes.header})`};
  transform: ${({ theme }) => `translateX(-${theme.sizes.padding})`};
  width: ${({ theme }) => theme.sizes.mobile};
  @media (max-width: 480px) {
    width: 100vw;
  }
`;

const StyledSlide = styled(SwiperSlide)`
  height: 100%;
  width: 100%;
  position: relative;
  img {
    position: relative;
    z-index: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const StyledDecoList = styled.div`
  position: absolute;
  top: 132px;
  width: 100%;
  display: flex;
  gap: 101px;
  flex-direction: column;
  padding: ${({ theme }) => `0 ${theme.sizes.padding}`};
  z-index: 1;
  div {
    display: flex;
    justify-content: space-around;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
