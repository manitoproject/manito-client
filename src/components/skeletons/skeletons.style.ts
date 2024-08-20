import { css } from '@emotion/react';
import styled from '@emotion/styled';

const skeletonAnimation = css`
  background-color: #f2f2f2;
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: skeleton-gradient 1.5s infinite ease-in-out;
  }
`;

export const SkeletonItem = styled.div`
  ${skeletonAnimation}
`;
