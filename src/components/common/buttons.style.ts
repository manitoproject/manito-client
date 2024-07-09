import styled from '@emotion/styled';

import { getBackgroundColor } from '../../styles/utils';
import { ButtonProps } from './buttons';

type ButtonType = Pick<ButtonProps, 'backgroundColor' | 'hasMarginBottom'>;

export const StyledButton = styled.button<ButtonType>`
  margin-bottom: ${({ hasMarginBottom }) => (hasMarginBottom ? `50px` : 0)};
  &:disabled {
    background-color: ${(props) => props.theme.colors.gray[200]};
    color: ${(props) => props.theme.colors.gray[500]};
  }
  font-weight: bold;
  border-radius: 4px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: ${(props) => props.theme.colors.white};
  background-color: ${({ backgroundColor }) =>
    getBackgroundColor(backgroundColor)};
`;

export const StyledKakaoButton = styled(StyledButton)`
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  font-family: ${(props) => props.theme.fontFamily.AppleSDGothicNeo};
  background-color: ${(props) => props.theme.colors.kakao};
  color: ${(props) => props.theme.colors.black};
`;
