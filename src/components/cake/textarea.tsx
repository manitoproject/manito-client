import styled from '@emotion/styled';

import { findCakeThemeStyle, findSvgByThemeName } from '@/lib/cake-decoration';
import { findFontByName } from '@/lib/common';
import { Font } from '@/lib/fonts';
import { ColorName, FontNameWithoutAppleFont } from '@/styles/theme';

interface CakeTextareaProps {
  themeName: string;
  content: string;
  setContent?: React.Dispatch<React.SetStateAction<string>>;
  fontName: FontNameWithoutAppleFont;
}

export default function CakeTextarea({
  themeName,
  content,
  setContent,
  fontName,
}: CakeTextareaProps) {
  const font = findFontByName(fontName);
  const Svg = findSvgByThemeName(themeName);
  const theme = findCakeThemeStyle(themeName);
  return (
    <StyledTextareaWarpper
      bg={theme?.bgColor}
      border={theme?.fontColor}
      font={font}
    >
      {Svg && <Svg width={96} height={96} />}
      <textarea
        value={content}
        disabled={!setContent}
        onChange={(e) => setContent && setContent(e.target.value)}
      />
    </StyledTextareaWarpper>
  );
}
const StyledTextareaWarpper = styled.div<{
  bg: ColorName | undefined;
  border: ColorName | undefined;
  font?: Font;
}>`
  position: relative;
  z-index: 50;
  padding: 12px;
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 12px;
  background-color: ${({ bg, theme }) => bg && theme.colors[bg]};
  svg {
    position: absolute;
    bottom: 212px;
    z-index: 9999999999;
  }
  textarea {
    font-size: 18px;
    font-weight: ${({ font }) => font?.fontWeight};
    font-family: ${({ font }) => font?.name};
    outline: none;
    border-radius: 4px;
    border: ${({ theme, border }) =>
      border && `1px dashed ${theme.colors[border]}`};
    color: ${({ theme }) => theme.colors['gray-900']};
    background-color: transparent;
    width: 100%;
    padding: 24px;
    height: 200px;
    resize: none;
  }
`;
