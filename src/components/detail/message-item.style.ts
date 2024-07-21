import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Font } from '../../constants/fonts';
import { ColorKey } from '../../styles/theme';

export const StyledMessageItem = styled.div<{ isServerData: boolean }>`
  cursor: ${({ isServerData }) => (isServerData ? 'auto' : 'pointer')};
  position: relative;
  width: 100%;
  button {
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    padding: 4px;
    background-color: ${({ theme }) => theme.colors.white};
    position: absolute;
  }

  svg {
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
  }
`;

export const StyledMessageBox = styled.p<{ color: ColorKey; font?: Font }>`
  ${({ font, theme }) =>
    font &&
    css`
      font-family: ${theme.fontFamily[font.name]};
      font-weight: ${font.fontWeight};
    `}
  font-size:12px;
  color: ${({ color, theme }) => theme.colors[color]};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 57.69%;
  height: 53.84%;
`;

export const StyledTrashButton = styled.button`
  top: 0;
  right: 0;
  svg path {
    fill: ${({ theme }) => theme.colors['gray-700']};
  }
`;
export const StyledDotsButton = styled.button`
  left: 0;
  bottom: 0;
  svg path {
    stroke: ${({ theme }) => theme.colors['gray-600']};
  }
`;

export const StyledEmptySvg = styled.div`
  border-radius: 999px;
  aspect-ratio: 1;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors['powderBlue-50']};
`;

export const StyledItem = styled.li`
  border: ${({ theme }) => `1px dashed ${theme.colors.white}`};
  background: rgba(249, 249, 249, 0.5);
  border-radius: 4px;
  aspect-ratio: 1;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
`;
