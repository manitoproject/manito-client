import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Font, fonts } from '../../constants/fonts';
import { getTextareaSize } from '../../styles/mixins';
import { ColorName, FontName } from '../../styles/theme';

interface EmojiItemProps {
  children: React.ReactNode;
  color: ColorName;
  fontName: FontName;
  emoji: string;
  isSmall?: boolean;
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
  color,
  emoji,
  fontName,
  isSmall = false,
}: EmojiItemProps) {
  const font = fonts.find((font) => {
    return font.name === fontName;
  });
  const emojiType = EMOJI_TYPE.find((type, i) => {
    if (EMOJI_TYPE.length - 1 === i) return true;
    return emoji.includes(type);
  });
  return (
    <StyledEmojiWrapper
      isSmall={isSmall}
      font={font}
      color={color}
      type={emojiType}
    >
      {children}
    </StyledEmojiWrapper>
  );
}

const StyledEmojiWrapper = styled.div<{
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
