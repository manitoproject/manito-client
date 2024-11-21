import 'swiper/css';

import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';

import ThemeItem from '@/components/rollingpaper/setup/theme-item';
import { ROLLINGPAPER_THEMES } from '@/lib/rolling-paper';
import { getFontSizeAndWeight } from '@/styles/mixins';

interface ThemeCarouselProps {
  activeTheme: RollingpaperThemeName;
  onChangeActiveTheme: (label: RollingpaperThemeName) => void;
}

export default function ThemeCarousel({
  activeTheme,
  onChangeActiveTheme,
}: ThemeCarouselProps) {
  return (
    <StyledWrapper>
      <h2>원하는 테마를 선택해주세요.</h2>
      <div>
        <StyledSwiper
          spaceBetween={16}
          slidesPerView="auto"
          slideToClickedSlide
        >
          {ROLLINGPAPER_THEMES.map(({ id, img, label }) => (
            <SwiperSlide key={id}>
              <ThemeItem
                onChangeActiveTheme={() => onChangeActiveTheme(id)}
                isActive={activeTheme === id}
                img={img}
                theme={label}
              />
            </SwiperSlide>
          ))}
        </StyledSwiper>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  h2 {
    color: ${(props) => props.theme.colors['gray-900']};
    ${getFontSizeAndWeight('heading2', 'medium')};
  }
`;

const StyledSwiper = styled(Swiper)`
  .swiper-slide {
    width: fit-content;
  }
`;
