import styled from '@emotion/styled';

export const StyledWrapper = styled.div`
  position: relative;
  font-family: ${({ theme }) => theme.fontFamily.SpoqaHanSansNeo};
  line-height: normal;
  display: flex;
  width: 100%;
  max-width: ${(props) => props.theme.sizes.mobile};
  margin: 0 auto;
  flex-direction: column;
  overflow: hidden;
`;

export const StyledMain = styled.main`
  padding-left: ${({ theme }) => theme.sizes.padding};
  padding-right: ${({ theme }) => theme.sizes.padding};
  padding-bottom: ${({ theme }) => theme.sizes.paddingBottom};
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  min-height: 100dvh;
  flex-direction: column;
  & > div:nth-of-type(1) {
    height: ${({ theme }) => theme.sizes.header};
  }
  & > div:nth-of-type(2) {
    flex: 1;
    display: flex;
    padding-top: ${({ theme }) => theme.sizes.paddingTop};
  }
`;

export const StyledBrowserBackdrop = styled.div`
  background-color: ${(props) => props.theme.colors['gray-100']};
  width: 100vw;
  height: 100dvh;
  left: 0;
  z-index: -1;
  position: fixed;
`;
