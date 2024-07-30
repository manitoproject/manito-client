import styled from '@emotion/styled';

import { getFontSizeAndWeight } from '../utils/style';

export const StyledRenameWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  gap: 16px;
  flex-direction: column;
  h3 {
    ${getFontSizeAndWeight('heading4', 'medium')};
    color: ${({ theme }) => theme.colors['gray-900']};
  }
  div:last-of-type {
    margin-top: auto;
  }
`;

export const StyledAvartarWrapper = styled.div<{ isOriginProfile: boolean }>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  button:nth-of-type(1) {
    pointer-events: none;
    position: relative;
    border-radius: 999px;
    overflow: hidden;
    img {
      width: 100px;
      height: 100px;
    }
    svg {
      padding: 4px;
      background-color: ${({ theme }) => theme.colors['powderBlue-200']};
      border-radius: 999px;
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
  button:nth-of-type(2) {
    pointer-events: ${({ isOriginProfile }) => isOriginProfile && 'none'};
    ${getFontSizeAndWeight('body1', 'medium')};
    border: 1px solid ${({ theme }) => theme.colors['gray-300']};
    color: ${({ theme }) => theme.colors['gray-900']};
    padding: 8px 16px;
    border-radius: 4px;
  }
`;
