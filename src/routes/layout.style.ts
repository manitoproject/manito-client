import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledWrapper = styled.div`
  position: relative;
  font-family: ${({ theme }) => theme.fontFamily.SpoqaHanSansNeo};
  line-height: normal;
  min-height: 100vh;
  display: flex;
  width: 100%;
  max-width: ${(props) => props.theme.sizes.mobile};
  margin: 0 auto;
  flex-direction: column;
  overflow: hidden;
`;

export const StyledMain = styled.main`
  background-color: ${(props) => props.theme.colors.white};
  width: 100%;
  flex: 1;
  display: flex;
  ${({ theme }) =>
    css`
      padding-left: ${theme.sizes.padding};
      padding-right: ${theme.sizes.padding};
      padding-top: calc(${theme.sizes.mainMarginTop} + ${theme.sizes.header});
      padding-bottom: ${theme.sizes.paddingBottom};
    `}
`;

export const StyledBrowserBackdrop = styled.div`
  background-color: ${(props) => props.theme.colors['gray-100']};
  width: 100vw;
  height: 100vh;
  left: 0;
  z-index: -1;
  position: fixed;
`;
