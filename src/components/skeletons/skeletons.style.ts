import { css } from '@emotion/react';
import styled from '@emotion/styled';

const skeletonAnimation = css`
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  @keyframes skeleton-gradient {
    0% {
      background-color: #f5f5f5; /* FROM Color 1 */
    }
    100% {
      background-color: #e2e2e2; /* TO Color 2 */
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: skeleton-gradient 1s linear infinite alternate;
  }
`;

export const SkeletonItem = styled.div`
  ${skeletonAnimation}
`;
