import styled from '@emotion/styled';

import { LinkButton } from '../components/common/buttons';
import { routes } from '../router';

export default function SetupIntro() {
  return (
    <StyledWrapper>
      <LinkButton to={routes.rolling.setup()} hasMarginBottom>
        시작하기
      </LinkButton>
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
  left: 0;
  position: absolute;
  transform: ${(props) => `translateY(-${props.theme.sizes.padding})`};
  right: 0;
  z-index: 0;
  background-image: url('/src/assets/imgs/intro/rolling-paper.svg');
  background-size: contain;
  background-repeat: no-repeat;
  height: 100%;
`;
