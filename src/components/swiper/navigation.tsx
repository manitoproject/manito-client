import styled from '@emotion/styled';

import { RightChevron } from '@/assets/svg/icons';
interface SwipeNavigationProps {
  isBeginning: boolean;
  isEnd: boolean;
  onSlideNext: () => void;
  onSlidePrev: () => void;
}

export default function SwiperNavigation({
  isBeginning,
  isEnd,
  onSlideNext,
  onSlidePrev,
}: SwipeNavigationProps) {
  return (
    <StyledNavigationWarpper>
      {!isBeginning && (
        <StyledPrevNavigation onClick={onSlidePrev}>
          <RightChevron />
        </StyledPrevNavigation>
      )}
      {!isEnd && (
        <StyledNextNavigation onClick={onSlideNext}>
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
