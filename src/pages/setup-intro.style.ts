import styled from '@emotion/styled';

import { getFontSizeAndWeight, StyledFixedBackground } from '@/styles/mixins';

export const StyledStartButtonWrapper = styled.div`
  margin-top: auto;
  z-index: 50;
  display: grid;
  gap: 12px;
`;

export const StyledRollingAndCakeAuthorCountDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 24px;
  width: fit-content;
  border-radius: 99999px;
  border: ${({ theme }) => `1px dashed ${theme.colors['pink-300']}`};
  color: ${({ theme }) => theme.colors['gray-900']};
  ${getFontSizeAndWeight('heading2', 'medium')}
  background-color: ${({ theme }) => theme.colors.white};
  span {
    color: ${({ theme }) => theme.colors['pink-300']};
    ${getFontSizeAndWeight('heading2', 'bold')}
  }
`;
export const StyledTreasureAuthorCountDiv = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  ${getFontSizeAndWeight('heading2', 'medium')}
  span {
    font-family: ${({ theme }) => theme.fontFamily.Cafe24Ohsquare};
  }
`;

export const StyledSetupIntroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledSetupIntroBackdrop = styled.div<{ bg: string }>`
  ${StyledFixedBackground};
  background-image: ${({ bg }) => `url(${bg})`};
`;
