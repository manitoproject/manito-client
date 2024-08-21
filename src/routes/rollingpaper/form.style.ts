import styled from '@emotion/styled';
import { Sheet } from 'react-modal-sheet';

import { StyledBackdrop } from './list.style';

export const StyledRollingFormWrapper = styled.div`
  position: relative;
  width: 100%;
`;
export const StyledRollingFormEmojiWrapper = styled.div<{
  isEmojiTab: boolean;
}>`
  position: relative;
  z-index: 1;
  & > div:nth-of-type(1) {
    transform: ${({ isEmojiTab }) =>
      `translateY(${isEmojiTab ? '-45px' : '-24px'})`};
  }
`;
export const StyledOverlayBackdrop = styled(StyledBackdrop)``;

export const StyledCustomSheet = styled(Sheet)`
  max-width: ${(props) => props.theme.sizes.mobile};
  margin: 0 auto;
  bottom: 0;
  .react-modal-sheet-backdrop {
  }
  .react-modal-sheet-container {
    padding: 0 24px;
    padding-bottom: 40px;
    border-radius: 0 !important;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2) !important;
  }
  .react-modal-sheet-header {
  }
  .react-modal-sheet-drag-indicator {
  }
  .react-modal-sheet-content {
    cursor: pointer;
    gap: 8px;
  }
`;

export const StyledSheetContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
