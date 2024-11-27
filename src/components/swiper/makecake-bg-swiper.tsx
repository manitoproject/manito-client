import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import SwiperNavigation from '@/components/swiper/navigation';
import useSwipeNavigation from '@/hooks/use-swipe-navigation';
import { CAKE_THEME_PALETTES, findSvgByThemeName } from '@/lib/cake-decoration';
import { messageQueries } from '@/lib/query-factory';
import routes from '@/routes';

interface MakeCakeSwipeProps {
  currnetPageIndex: number;
  setCurrnetPageIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function MakeCakeBgSwiper({
  currnetPageIndex,
  setCurrnetPageIndex,
}: MakeCakeSwipeProps) {
  const navigate = useNavigate();
  const swiperRef = useRef<SwiperType>();
  const params = useParams();
  const { data: messages } = useQuery(messageQueries.paper(Number(params.id)));
  const { isBeginning, isEnd, updateSlideStatus } = useSwipeNavigation(
    currnetPageIndex,
    CAKE_THEME_PALETTES.length,
  );
  const handleSlideChange = (e: SwiperType) => {
    updateSlideStatus(e.isBeginning, e.isEnd);
    setCurrnetPageIndex(e.activeIndex);
  };

  const handleViewItemDetail = (pageId: number, itemId: number) => {
    navigate({
      pathname: routes.makecake.detail(pageId),
      search: createSearchParams({ id: String(itemId) }).toString(),
    });
  };

  const startIndex =
    currnetPageIndex === 0 ? 0 : currnetPageIndex === 1 ? 13 : 26;
  const endIndex =
    currnetPageIndex === 0 ? 13 : currnetPageIndex === 1 ? 26 : 39;

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
        initialSlide={currnetPageIndex}
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
            <img src={theme.cakeUrl} alt={theme.cakeUrl} />
            <img src={theme.emptyBgUrl} alt={theme.emptyBgUrl} />
          </StyledSlide>
        ))}
      </StyledSwiper>
      <SwiperNavigation
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
  height: ${({ theme }) => `calc(100dvh - ${theme.sizes.header})`};
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
  img:nth-of-type(1) {
    width: 300px;
    z-index: 1;
    left: 50%;
    top: 100px;
    transform: translateX(-50%);
    position: absolute;
  }
  img:nth-of-type(2) {
    position: relative;
    z-index: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const StyledDecoList = styled.div`
  position: absolute;
  top: 18vh;
  width: 100%;
  display: flex;
  gap: 12vh;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => `0 ${theme.sizes.padding}`};
  z-index: 1;
  div:nth-child(1) {
    width: 80%;
    gap: 5vw;
  }
  div:nth-child(2) {
    width: 90%;
    gap: 8vw;
  }
  div:nth-child(3) {
    gap: 4vw;
  }
  div {
    width: 100%;
    display: flex;
  }
  button {
    /* width: 20%; */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 480px) {
    top: 22vh;
    gap: 8vh;
    div:nth-child(1) {
      width: 80%;
      gap: 1vw;
    }
    div:nth-child(2) {
      width: 90%;
      gap: 4vw;
    }
    div:nth-child(3) {
      gap: 1vw;
    }
  }
`;
