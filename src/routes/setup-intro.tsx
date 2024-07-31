import styled from '@emotion/styled';

import { LinkButton } from '../components/common/buttons';
import { routes } from '../router';
import { StyledFixedBackground } from '../styles/mixins';

export default function SetupIntro() {
  return (
    <StyledWrapper>
      <LinkButton to={routes.rolling.setup()}>시작하기</LinkButton>
      <StyledBackdrop />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  a {
    z-index: 50;
    margin-top: auto;
  }
`;

const StyledBackdrop = styled.div`
  ${StyledFixedBackground};
  background-image: url('/src/assets/imgs/intro/rollring-paper-B@4x-1002.jpg');
`;
