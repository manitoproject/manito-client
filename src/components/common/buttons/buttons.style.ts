import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import {
  CommonButtonProps,
  LinkButtonProps,
} from '@/components/common/buttons/buttons';
import { getFontSizeAndWeight } from '@/styles/mixins';
import { ThemeType } from '@/styles/theme';

const commonButtonStyle = ({
  backgroundColor,
  theme,
  font = 'SpoqaHanSansNeo',
}: CommonButtonProps & { theme: ThemeType }) => css`
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  line-height: 24px;
  justify-content: center;
  width: 100%;
  font-family: ${font};
  color: ${theme.colors.white};
  background-color: ${backgroundColor
    ? theme['colors'][backgroundColor]
    : theme.colors.black};
  ${getFontSizeAndWeight('heading3', 'bold')};
  &:disabled {
    background-color: ${theme.colors['gray-200']};
    color: ${theme.colors['gray-500']};
  }
`;

export const StyledButton = styled.button<CommonButtonProps>`
  ${({ backgroundColor, theme, font }) =>
    commonButtonStyle({
      backgroundColor,
      theme,
      font,
    })};
`;

export const StyledKakaoButton = styled(StyledButton)`
  gap: 8px;
  background-color: ${(props) => props.theme.colors.kakao};
  color: ${(props) => props.theme.colors.black};
`;

export const StyledLinkButton = styled(Link)<LinkButtonProps>`
  ${({ backgroundColor, theme, font }) =>
    commonButtonStyle({
      backgroundColor,
      theme,
      font,
    })};
  ${({ disabled, theme, backgroundColor }) =>
    css`
      background-color: ${disabled
        ? theme.colors['gray-200']
        : theme['colors'][backgroundColor ?? 'black']};
      color: ${disabled ? theme.colors['gray-500'] : theme.colors.white};
      cursor: ${disabled ? 'auto' : 'pointer'};
      display: inline-flex;
      width: 100%;
    `}
`;
