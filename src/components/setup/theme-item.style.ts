import styled from '@emotion/styled';

import { ThemeItemProps } from './theme-item';

export const StyledThemeItem = styled.div<Pick<ThemeItemProps, 'isActive'>>`
  cursor: pointer;
  padding: 16px;
  user-select: none;
  display: flex;
  width: 148px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.powderBlue[50] : theme.colors.white};
  border: 1px solid
    ${({ isActive, theme }) =>
      isActive ? theme.colors.powderBlue[900] : theme.colors.gray[300]};
  border-radius: 8px;
  div {
    width: 100%;
    img {
      width: 100%;
      border-radius: 4px;
      height: 224px;
    }
    display: flex;
    justify-content: center;
  }
`;

export const StyledTitle = styled.div<Pick<ThemeItemProps, 'isActive'>>`
  font-weight: ${({ isActive }) => (isActive ? 700 : 500)};
  width: 100%;
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.powderBlue[900] : theme.colors.gray[600]};
  padding: 6px 0;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 99px;
  background-color: ${({ theme }) => theme.colors.white};
`;
