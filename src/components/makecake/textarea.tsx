import styled from '@emotion/styled';

import { findCakeThemeStyle } from '@/lib/cake-decoration';
import { findFontByName, findImgByThemeName } from '@/lib/common';
import { Font } from '@/lib/fonts';
import { ColorName, FontNameWithoutAppleFont } from '@/styles/theme';

interface MakeCakeTextareaProps {
  themeName: string;
  content: string;
  onChangeContent?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  fontName: FontNameWithoutAppleFont;
}

export default function MakeCakeTextarea({
  themeName,
  content,
  onChangeContent,
  fontName,
}: MakeCakeTextareaProps) {
  const font = findFontByName(fontName);
  const img = findImgByThemeName(themeName);
  const theme = findCakeThemeStyle(themeName);
  console.log(themeName);
  return (
    <StyledTextareaWarpper
      bg={theme?.bgColor}
      border={theme?.fontColor}
      font={font}
    >
      <img src={img} alt={themeName} />
      <textarea
        value={content}
        name="content"
        disabled={!onChangeContent}
        onChange={onChangeContent}
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
  img {
    width: 96px;
    height: 96px;
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
