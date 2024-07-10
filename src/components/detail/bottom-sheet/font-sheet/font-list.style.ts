import styled from '@emotion/styled';

export const StyledFontList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
`;
export const StyledFontItem = styled.button<{
  weight: number;
  isActive: boolean;
}>`
  border-radius: 4px;
  font-weight: ${({ weight }) => weight};
  font-size: 14px;
  padding: 12px 0;
  line-height: 17px;
  outline: ${({ isActive, theme }) =>
    isActive && `1px dashed ${theme.colors['powderBlue-900']}`};
`;
