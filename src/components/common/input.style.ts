import styled from '@emotion/styled';

import { InputProps } from './input';

export const StyledWrapper = styled.div<Pick<InputProps, 'isError'>>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  div {
    position: relative;
  }
  input {
    color: ${({ theme, isError }) =>
      isError ? theme.colors.error : theme.colors.black};
    font-size: 14px;
    box-sizing: border-box;
    padding: 16px 44px 16px 12px;
    width: 100%;
    background-color: ${({ theme, isError }) =>
      isError ? theme.colors['powderBlue-100'] : theme.colors['powderBlue-50']};
    border-radius: 4px;
    outline: 1px solid
      ${({ theme, isError }) =>
        isError ? theme.colors.error : theme.colors['powderBlue-300']};
  }
  input::placeholder {
    color: ${(props) => props.theme.colors['gray-400']};
  }
  input:focus {
    background-color: ${({ theme }) => theme.colors['powderBlue-100']};
    outline: 1px solid
      ${({ theme, isError }) =>
        isError ? theme.colors.error : theme.colors['powderBlue-900']};
  }

  &:focus-within button {
    display: block;
  }

  input:disabled {
    color: ${({ theme }) => theme.colors['gray-500']};
    background-color: ${({ theme }) => theme.colors['gray-100']};
    outline: none;
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
    margin-left: 12px;
    font-size: 12px;
    color: ${({ theme, isError }) =>
      isError ? theme.colors.error : theme.colors['gray-600']};
    strong {
      font-weight: 700;
      color: ${({ theme, isError }) =>
        isError ? `inherit` : theme.colors['gray-800']};
    }
  }
`;
