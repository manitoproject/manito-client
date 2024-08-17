import styled from '@emotion/styled';

import { getFontSizeAndWeight } from '../../styles/mixins';
import { EditedHeaderConfig } from './header';

type HeaderColor = Pick<EditedHeaderConfig, 'headerColor'>;
type Header = Pick<EditedHeaderConfig, 'headerColor' | 'hasBorder'>;

export const StyledHeader = styled.header<Header>`
  max-width: ${(props) => props.theme.sizes.mobile};
  width: 100%;
  z-index: 51;
  position: fixed;
  background-color: ${({ headerColor }) => headerColor};
  border-bottom: ${({ hasBorder, theme }) =>
    !hasBorder ? 'none' : `1px solid ${theme.colors['gray-300']}`};
  & > div {
    h1 {
      ${getFontSizeAndWeight('heading2', 'medium')}
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({ headerColor, theme }) =>
      headerColor !== theme.colors.white
        ? theme.colors.white
        : theme.colors['gray-800']};
    padding: ${(props) => `0 ${props.theme.sizes.padding}`};
    padding-top: 16px;
    padding-bottom: 16px;
    ${getFontSizeAndWeight('heading2', 'medium')}
  }
`;

export const StyledLeftButton = styled.button<HeaderColor>`
  svg {
    rect {
      fill: ${({ headerColor, theme }) =>
        headerColor === theme.colors.white
          ? theme.colors.white
          : 'transparent'};
    }
    path {
      stroke: ${({ headerColor, theme }) =>
        headerColor === theme.colors.white ? 'auto' : theme.colors.white};
    }
  }
`;

export const StyledMenuButton = styled.button<HeaderColor>`
  margin-left: auto;
  svg path {
    stroke: ${({ headerColor, theme }) =>
      headerColor === theme.colors.white ? 'auto' : theme.colors.white};
  }
`;
