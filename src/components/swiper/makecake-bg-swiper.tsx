import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import SwiperNavigation from '@/components/swiper/navigation';
import useSwipeNavigation from '@/hooks/use-swipe-navigation';
import { CAKE_THEME_PALETTES, decoPositions } from '@/lib/cake-decoration';
import { findImgByThemeName } from '@/lib/common';
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

  const buttons = messages?.slice(startIndex, endIndex).map((deco, i) => {
    return (
      <button
        style={{ left: decoPositions[i].x, top: decoPositions[i].y }}
        type="button"
        key={deco.id}
        onClick={() => handleViewItemDetail(deco.paperId, deco.id)}
      >
        <img src={findImgByThemeName(deco.theme)} alt={deco.theme} />
        {/* {Svg && <Svg width={66} height={66} />} */}
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
              {buttons?.slice(0, 13)}
              <img src={theme.cakeUrl} alt={theme.cakeUrl} />
            </StyledDecoList>

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
  position: relative;
  & > img {
    top: 0;
    bottom: 0;
    position: absolute;
    z-index: 0;
  }
`;

const StyledDecoList = styled.div`
  position: relative;
  z-index: 50;
  width: 350px;
  left: 50%;
  top: 120px;
  transform: translateX(-50%);
  height: 550px;
  button {
    position: absolute;
    width: 66px;
    height: 66px;
  }
  img {
    width: 100%;
    height: 100%;
  }
`;
