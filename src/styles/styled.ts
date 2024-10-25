import styled from '@emotion/styled';

import { StyledFixedBackground } from '@/styles/mixins';

export const StyledContentOverlay = styled.div<{ zIndex?: number }>`
  background: #00000033;
  z-index: ${({ zIndex }) => zIndex ?? 1};
  ${StyledFixedBackground};
`;
