import styled from '@emotion/styled';

import { HeaderConfig } from '../../lib/header-map';
import { getFontSizeAndWeight } from '../../utils/style';

type HeaderType = Pick<HeaderConfig, 'hasBorder' | 'hasHeaderColor'>;
type HeaderButtonType = Pick<HeaderConfig, 'hasHeaderColor'>;
export const StyledHeader = styled.header<HeaderType>`
  max-width: ${(props) => props.theme.sizes.mobile};
  width: 100%;
  z-index: 50;
  position: fixed;
  background-color: ${({ hasHeaderColor, theme }) =>
    hasHeaderColor ? theme.colors.powderBlue[900] : theme.colors.white};
  border-bottom: ${({ hasBorder, theme }) =>
    hasBorder ? `1px solid ${theme.colors.gray[300]}` : 'none'};
  & > div:first-child {
    h1 {
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({ hasHeaderColor, theme }) =>
      hasHeaderColor ? theme.colors.white : theme.colors.gray[800]};
    padding: ${(props) => `0 ${props.theme.sizes.padding}`};
    padding-top: 14px;
    padding-bottom: 14px;
    ${getFontSizeAndWeight('heading3', 'medium')}
  }
`;

export const StyledLeftButton = styled.button<HeaderButtonType>`
  svg {
    rect {
      fill: ${({ hasHeaderColor, theme }) =>
        hasHeaderColor ? 'transparent' : theme.colors.white};
    }
    path {
      stroke: ${({ hasHeaderColor, theme }) =>
        hasHeaderColor ? theme.colors.white : 'auto'};
    }
  }
`;

export const StyledMenuButton = styled.button<HeaderButtonType>`
  margin-left: auto;
  svg path {
    stroke: ${({ hasHeaderColor, theme }) =>
      hasHeaderColor ? theme.colors.white : 'auto'};
  }
`;
