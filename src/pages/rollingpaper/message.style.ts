import styled from '@emotion/styled';

export const StyledRollingFormWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledRollingFormEmojiWrapper = styled.div<{
  isEmojiSelectionPage?: boolean;
}>`
  position: relative;
  z-index: 1;
  & > div:nth-of-type(1) {
    transform: ${({ isEmojiSelectionPage }) =>
      `translateY(${isEmojiSelectionPage ? '-45px' : '-24px'})`};
  }
`;
