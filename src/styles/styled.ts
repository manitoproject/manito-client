import styled from '@emotion/styled';

import { StyledFixedBackground } from '@/styles/mixins';

export const StyledContentOverlay = styled.div<{
  opacity: number;
  zIndex?: number;
}>`
  background: ${({ opacity }) => `#000000${opacity}`};
  z-index: ${({ zIndex }) => zIndex ?? 1};
  ${StyledFixedBackground};
`;
