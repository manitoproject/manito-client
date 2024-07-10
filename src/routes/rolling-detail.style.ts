import styled from '@emotion/styled';

import { ThemeKey } from '../lib/theme-map';

export const StyledRollingDetail = styled.div`
  width: 100%;
`;
export const StyledWrapper = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const StyledBackdrop = styled.div<{ themeName: ThemeKey }>`
  background-image: ${({ themeName }) =>
    `url(/src/assets/imgs/bg/${themeName}.png)`};
  background-size: cover;
  top: 0;
  background-repeat: no-repeat;
  position: absolute;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
`;
