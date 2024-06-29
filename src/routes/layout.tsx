import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

import { getFontSizeAndWeight } from '../styles/utils';

export default function Layout() {
  return (
    <StyledLayout>
      <StyledHeader>
        <div>메인 페이지</div>
      </StyledHeader>
      <StyledMain>{<Outlet />}</StyledMain>
    </StyledLayout>
  );
}

const StyledLayout = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.SpoqaHanSansNeo};
  line-height: normal;
`;

const StyledHeader = styled.header`
  max-width: ${({ theme }) => theme.sizes.mobile};
  margin: 0 auto;
  border-bottom: 1px solid black;
  div {
    padding: ${({ theme }) => theme.sizes.padding};
    ${getFontSizeAndWeight('heading1', 'b')}
  }
`;

const StyledMain = styled.main`
  ${({ theme }) => css`
    padding: ${theme.sizes.padding};
    max-width: ${theme.sizes.mobile};
  `}
  margin: 0 auto;
`;
