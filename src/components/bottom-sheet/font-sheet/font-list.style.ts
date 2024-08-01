import styled from '@emotion/styled';

export const StyledFontList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px 4px;
`;
export const StyledFontItem = styled.button<{
  weight: number;
  isActive: boolean;
  font: string;
}>`
  font-family: ${({ font }) => font};
  border-radius: 4px;
  font-weight: ${({ weight }) => weight};
  font-size: 14px;
  height: 96px;
  padding: 12px 0;
  line-height: 17px;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors['powderBlue-100'] : theme.colors.white};
  outline: ${({ isActive, theme }) =>
    isActive && `1px dashed ${theme.colors['powderBlue-900']}`};
`;
