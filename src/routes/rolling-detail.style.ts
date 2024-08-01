import styled from '@emotion/styled';

import { ThemeName } from '../constants/theme-list';
import { StyledFixedBackground } from '../styles/mixins';

export const StyledRollingDetail = styled.div`
  width: 100%;
`;
export const StyledWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 28px;
  z-index: 50;
`;

export const StyledBackdrop = styled.div<{ themeName?: ThemeName }>`
  background-image: ${({ themeName }) =>
    `url(/src/assets/imgs/bg/${themeName}-theme@4x-100.jpg)`};
  ${StyledFixedBackground};
`;
