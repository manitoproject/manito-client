import styled from '@emotion/styled';

import { Font } from '../constants/fonts';
import { ColorKey } from '../styles/theme';
import { StyledBackdrop } from './rolling-detail.style';
import { EmojiType } from './rolling-new';

export const StyledEmojiWrapper = styled.div<{
  type: EmojiType;
  color: ColorKey;
  font: Font;
}>`
  width: 100%;
  transform: translateY(-24px);
  position: relative;
  svg {
    width: 100%;
    height: 100%;
  }
  textarea {
    font-size: 22px;
    font-family: ${({ theme, font }) => theme.fontFamily[font.name]};
    font-weight: ${({ font }) => font.fontWeight};
    color: ${({ color, theme }) => theme.colors[color]};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 55.5%;
    height: 55.5%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    resize: none;
    outline: none;
    background-color: transparent;
  }
`;

export const StyledRollingNew = styled.div`
  width: 100%;
`;
export const StyledRollingNewWrapper = styled.div`
  position: relative;
  z-index: 1;
`;
export const StyledOverlayBackdrop = styled(StyledBackdrop)``;
