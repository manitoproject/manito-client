import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getEmojiObjectByName } from '../../constants/emojis';
import { Font, FONTS } from '../../constants/fonts';
import { getTextareaSize } from '../../styles/mixins';
import { ColorName, FontNameWithoutAppleGothic } from '../../styles/theme';
import { Message } from '../../types/message';

export type EmojiType = 'Circle' | 'Square' | 'Clover' | 'Star' | 'Polygon';
const EMOJI_TYPE: EmojiType[] = [
  'Circle',
  'Square',
  'Polygon',
  'Star',
  'Clover',
];

interface MessageSkinProps {
  children: React.ReactNode;
  ColorName: ColorName;
  FontName: FontNameWithoutAppleGothic;
  theme: Message['theme'];
  isSmall?: boolean;
}

export default function MessageSkin({
  children,
  ColorName,
  theme,
  FontName,
  isSmall = false,
}: MessageSkinProps) {
  const emoji = getEmojiObjectByName(theme);
  const emojiType = EMOJI_TYPE.find((type, i) => {
    if (EMOJI_TYPE.length - 1 === i) return true;
    return emoji?.name.includes(type);
  });
  return (
    <StyledMessageSkinWrapper
      isSmall={isSmall}
      font={FONTS[FontName]}
      color={ColorName}
      type={emojiType}
    >
      {children}
    </StyledMessageSkinWrapper>
  );
}

const StyledMessageSkinWrapper = styled.div<{
  type?: EmojiType;
  color: ColorName;
  font?: Font;
  isSmall?: boolean;
}>`
  ${({ theme, type, color, font, isSmall }) => css`
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
    overflow-y: ${isSmall ? 'hidden' : 'auto'};
    word-break: break-all;
    white-space: pre-wrap;
    font-size:  ${isSmall ? '14px' : '22px'};
    font-family: ${theme['fontFamily'][font?.name ?? 'SpoqaHanSansNeo']};
    font-weight: ${font?.fontWeight};
    color: ${theme.colors[color]};
    transform: translateX(-50%);
    ${getTextareaSize(type, isSmall)};
    position: absolute;
    left: 50%;
    resize: none;
    outline: none;
    background-color: transparent;
    `}
`;
