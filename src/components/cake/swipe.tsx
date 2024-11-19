import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import SwipeNavigation from '@/components/swipe/navigation';
import useSwipeNavigation from '@/hooks/use-swipe-navigation';
import { CAKE_THEME_PALETTES, findSvgByThemeName } from '@/lib/cake-decoration';
import { messageQueries } from '@/lib/query-factory';
import routes from '@/routes';

interface CakeSwipeProps {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function CakeSwipe({
  activeIndex,
  setActiveIndex,
}: CakeSwipeProps) {
  const navigate = useNavigate();
  const swiperRef = useRef<SwiperType>();
  const params = useParams();
  const { data: messages } = useQuery(messageQueries.paper(Number(params.id)));
  const { isBeginning, isEnd, updateSlideStatus } = useSwipeNavigation(
    activeIndex,
    CAKE_THEME_PALETTES.length,
  );
  const handleSlideChange = (e: SwiperType) => {
    updateSlideStatus(e.isBeginning, e.isEnd);
    setActiveIndex(e.activeIndex);
  };

  const handleViewItemDetail = (pageId: number, itemId: number) => {
    navigate({
      pathname: routes.cake.detail(pageId),
      search: createSearchParams({ id: String(itemId) }).toString(),
    });
  };

  const startIndex = activeIndex === 0 ? 0 : activeIndex === 1 ? 13 : 26;
  const endIndex = activeIndex === 0 ? 13 : activeIndex === 1 ? 26 : 39;

  const buttons = messages?.slice(startIndex, endIndex).map((deco) => {
    const Svg = findSvgByThemeName(deco.theme);
    return (
      <button
        type="button"
        key={deco.id}
        onClick={() => handleViewItemDetail(deco.paperId, deco.id)}
      >
        {Svg && <Svg width={66} height={66} />}
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
        {CAKE_THEME_PALETTES.map((theme) => (
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
  top: 20vh;
  width: 100%;
  display: flex;
  gap: 9vh;
  flex-direction: column;
  padding: ${({ theme }) => `0 ${theme.sizes.padding}`};
  z-index: 1;
  div {
    justify-content: space-around;
    display: flex;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
