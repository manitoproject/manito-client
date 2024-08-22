import styled from '@emotion/styled';

import bg from '../assets/imgs/intro/rollring-paper-B@4x-1004.webp';
import { LinkButton } from '../components/common/button/buttons';
import routes from '../routes';
import { StyledFixedBackground } from '../styles/mixins';

export default function SetupIntro() {
  return (
    <StyledWrapper>
      <LinkButton to={routes.rollingpaper.setup()}>시작하기</LinkButton>
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
  background-image: ${`url(${bg})`};
`;
