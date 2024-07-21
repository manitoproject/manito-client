import styled from '@emotion/styled';

import { ThemeKey } from '../constants/theme-list';

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

export const StyledBackdrop = styled.div<{ themeName?: ThemeKey }>`
  background-image: ${({ themeName }) =>
    `url(/src/assets/imgs/bg/${themeName}-theme@4x-100.jpg)`};
  background-size: cover;
  top: 0;
  background-repeat: no-repeat;
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
`;
