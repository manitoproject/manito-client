import styled from '@emotion/styled';

import { getFontSizeAndWeight } from '../utils/style';

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
  h2 {
    color: ${(props) => props.theme.colors['gray-900']};
    ${getFontSizeAndWeight('heading3', 'medium')};
  }
  strong {
    font-size: 18px;
    color: ${(props) => props.theme.colors['powderBlue-900']};
    ${getFontSizeAndWeight('heading2', 'bold')};
  }
`;

export const StyledSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
