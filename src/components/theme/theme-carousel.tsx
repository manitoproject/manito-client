import 'swiper/css';

import styled from '@emotion/styled';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getFontSizeAndWeight } from '../../styles/utils';
import ThemeItem from './theme-item';

const themeList = [
  { theme: '우주', img: '/src/assets/imgs/space-theme.png' },
  { theme: '학교', img: '/src/assets/imgs/space-theme.png' },
  { theme: '자연', img: '/src/assets/imgs/space-theme.png' },
];

export default function ThemeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <StyledWrapper>
      <h2>원하는 테마를 선택해주세요.</h2>
      <div>
        <StyledSwiper
          spaceBetween={12}
          slidesPerView="auto"
          slideToClickedSlide
        >
          {themeList.map(({ theme, img }, i) => (
            <SwiperSlide key={theme}>
              <ThemeItem
                onClick={() => setActiveIndex(i)}
                isActive={i === activeIndex}
                img={img}
                theme={theme}
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
    color: ${(props) => props.theme.colors.gray[900]};
    ${getFontSizeAndWeight('heading3', 'medium')};
  }
`;

const StyledSwiper = styled(Swiper)`
  .swiper-slide {
    width: fit-content;
  }
`;
