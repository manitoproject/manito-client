import styled from '@emotion/styled';

import { StyledBackdrop } from './rolling-detail.style';

export const StyledRollingNew = styled.div`
  width: 100%;
`;
export const StyledRollingNewWrapper = styled.div`
  position: relative;
  z-index: 1;
  & > div:nth-of-type(1) {
    transform: translateY(-24px);
  }
`;
export const StyledOverlayBackdrop = styled(StyledBackdrop)``;
