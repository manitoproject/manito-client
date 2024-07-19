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

export const StyledAvartarWrapper = styled.div`
  display: flex;
  justify-content: center;
  button {
    position: relative;
    border-radius: 999px;
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
`;
