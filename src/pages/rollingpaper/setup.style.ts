import styled from '@emotion/styled';

import { getFontSizeAndWeight } from '@/styles/mixins';

export const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  button {
    margin-top: auto;
    z-index: 50;
  }
`;

export const StyledHeading = styled.div`
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

export const StyledSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-bottom: 32px;
`;
