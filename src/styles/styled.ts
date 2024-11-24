import styled from '@emotion/styled';

import { getFontSizeAndWeight, StyledFixedBackground } from '@/styles/mixins';

export const StyledContentOverlay = styled.div<{
  opacity: number;
  zIndex?: number;
}>`
  background: ${({ opacity }) => `#000000${opacity}`};
  z-index: ${({ zIndex }) => zIndex ?? 1};
  ${StyledFixedBackground};
`;
export const StyledSetupWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  button {
    margin-top: auto;
    z-index: 50;
  }
`;

export const StyledSetupNameFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-bottom: 32px;
`;

export const StyledSetupHeading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  h2 {
    color: ${(props) => props.theme.colors['gray-800']};
    ${getFontSizeAndWeight('heading2', 'medium')};
  }
  h3 {
    line-height: 30px;
    ${getFontSizeAndWeight('heading1', 'bold')};
    color: ${(props) => props.theme.colors['gray-900']};
    strong {
      color: ${(props) => props.theme.colors['powderBlue-900']};
    }
  }
`;

export const StyledWriteButton = styled.button<{ bgColor: string }>`
  z-index: 50;
  padding: 10px;
  border-radius: 8px;
  background-color: ${({ bgColor }) => bgColor};
  width: fit-content;
  position: absolute;
  right: 0;
  bottom: 0;
`;
