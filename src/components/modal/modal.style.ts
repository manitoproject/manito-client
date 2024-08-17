import styled from '@emotion/styled';

import { getFontSizeAndWeight } from '../../styles/mixins';

export const StyledModalMainWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  & > div {
    padding: 36px 24px;
    flex-direction: column;
    display: flex;
    gap: 24px;
    align-items: center;
    min-width: 400px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors['gray-300']};
    background-color: white;
  }
`;

export const StyledTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  h1 {
    text-align: center;
    ${getFontSizeAndWeight('heading2', 'bold')};
    color: ${({ theme }) => theme.colors['gray-900']};
  }
  p {
    text-align: center;
    color: ${({ theme }) => theme.colors['gray-600']};
    ${getFontSizeAndWeight('heading4', 'regular')};
  }
`;

export const StyledRadioFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
export const StyledRadioFormTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  h1 {
    color: ${({ theme }) => theme.colors['gray-900']};
    ${getFontSizeAndWeight('heading2', 'bold')};
  }
  p {
    color: ${({ theme }) => theme.colors['gray-500']};
    ${getFontSizeAndWeight('body1', 'medium')};
  }
`;

export const StyledButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  flex: 1;
`;
export const StyledButton = styled.button`
  &:disabled {
    background-color: ${({ theme }) => theme.colors['gray-200']};
    color: ${({ theme }) => theme.colors['gray-500']};
  }
  ${getFontSizeAndWeight('heading3', 'bold')};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  display: flex;
  flex: 1;
  padding: 20px 16px;
`;
