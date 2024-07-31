import styled from '@emotion/styled';

import { getFontSizeAndWeight } from '../../styles/mixins';
import { InputProps } from './input';

export const StyledWrapper = styled.div<Pick<InputProps, 'isError'>>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  div {
    position: relative;
  }
  input {
    outline: none;
    color: ${({ theme, isError }) =>
      isError ? theme.colors.error : theme.colors.black};
    box-sizing: border-box;
    padding: 20.5px 44px 20.5px 12px;
    width: 100%;
    ${getFontSizeAndWeight('heading3', 'regular')}
    background-color: ${({ theme, isError }) =>
      isError ? theme.colors['powderBlue-100'] : theme.colors['powderBlue-50']};
    border-radius: 4px;
    border: 1px solid
      ${({ theme, isError }) =>
        isError ? theme.colors.error : theme.colors['powderBlue-300']};
  }
  input::placeholder {
    color: ${(props) => props.theme.colors['gray-500']};
  }
  input:focus {
    background-color: ${({ theme }) => theme.colors['powderBlue-100']};
    border: 1px solid
      ${({ theme, isError }) =>
        isError ? theme.colors.error : theme.colors['powderBlue-900']};
  }

  &:focus-within button {
    display: block;
  }

  input:disabled {
    color: ${({ theme }) => theme.colors['gray-500']};
    background-color: ${({ theme }) => theme.colors['gray-100']};
    border: none;
  }
  button {
    display: none;
    transition: display 0s ease 50ms;
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
  }

  span {
    ${getFontSizeAndWeight('body1', 'regular')}
    margin-left: 12px;
    color: ${({ theme, isError }) =>
      isError ? theme.colors.error : theme.colors['gray-600']};
    strong {
      font-weight: normal;
      color: ${({ theme, isError }) =>
        isError ? `inherit` : theme.colors['gray-900']};
    }
  }
`;
