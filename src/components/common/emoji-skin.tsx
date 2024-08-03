import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { findEmojiForTheme } from '../../constants/emojis';
import { Font, fonts } from '../../constants/fonts';
import { getTextareaSize } from '../../styles/mixins';
import { ColorKey, FontKey } from '../../styles/theme';
import { Message } from '../../types/message';

interface EmojiItemProps {
  children: React.ReactNode;
  colorKey: ColorKey;
  fontKey: FontKey;
  theme: Message['theme'];
  isMini?: boolean;
}

export type EmojiType = 'Circle' | 'Square' | 'Clover' | 'Star' | 'Polygon';
const EMOJI_TYPE: EmojiType[] = [
  'Circle',
  'Square',
  'Polygon',
  'Star',
  'Clover',
];

export default function EmojiSkin({
  children,
  colorKey,
  theme,
  fontKey,
  isMini = false,
}: EmojiItemProps) {
  const font = fonts.find((font) => {
    return font.name === fontKey;
  });
  const emoji = findEmojiForTheme(theme);
  const emojiType = EMOJI_TYPE.find((type, i) => {
    if (EMOJI_TYPE.length - 1 === i) return true;
    return emoji?.name.includes(type);
  });
  return (
    <StyledEmojiWrapper
      isMini={isMini}
      font={font}
      color={colorKey}
      type={emojiType}
    >
      {children}
    </StyledEmojiWrapper>
  );
}

const StyledEmojiWrapper = styled.div<{
  type?: EmojiType;
  color: ColorKey;
  font?: Font;
  isMini?: boolean;
}>`
  ${({ theme, type, color, font, isMini }) => css`
  width: 100%;
  position: relative;
  svg {
    width: 100%;
    height: 100%;
  }
  p {
    /* pointer-events: none; */
  }
  textarea,
  p {
    overflow-y: ${isMini ? 'hidden' : 'auto'};
    word-break: break-all;
    white-space: pre-wrap;
    font-size:  ${isMini ? '14px' : '22px'};
    font-family: ${theme['fontFamily'][font?.name ?? 'SpoqaHanSansNeo']};
    font-weight: ${font?.fontWeight};
    color: ${theme.colors[color]};
    transform: translateX(-50%);
    ${getTextareaSize(type, isMini)};
    position: absolute;
    left: 50%;
    resize: none;
    outline: none;
    background-color: transparent;
    `}
`;
