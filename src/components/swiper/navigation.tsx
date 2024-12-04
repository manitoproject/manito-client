import styled from '@emotion/styled';
import { useSwiper } from 'swiper/react';

import { RightChevron } from '@/assets/svg/icons';

export default function SwiperNavigation() {
  const swiper = useSwiper();
  return (
    <StyledNavigationWarpper>
      {!swiper.isBeginning && (
        <StyledPrevNavigation onClick={() => swiper.slidePrev()}>
          <RightChevron />
        </StyledPrevNavigation>
      )}
      {!swiper.isEnd && (
        <StyledNextNavigation onClick={() => swiper.slideNext()}>
          <RightChevron />
        </StyledNextNavigation>
      )}
    </StyledNavigationWarpper>
  );
}

export const StyledNavigationWarpper = styled.div`
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
export const StyledPrevNavigation = styled.button`
  transform: translateY(-50%) rotate(180deg);
  left: 0;
`;
export const StyledNextNavigation = styled.button`
  transform: translateY(-50%);
  right: 0;
`;
