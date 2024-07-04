import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, KakaoLoginButton } from '../components/common/buttons';
import { routes } from '../router';
import { getFontSizeAndWeight } from '../styles/utils';
import { Backdrop } from './layout';

export default function Index() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const navigate = useNavigate();
  return (
    <StyledWrapper>
      <StyledLogoWrapper>
        <img src="src/assets/imgs/logo.png" alt="logo" />
      </StyledLogoWrapper>
      {isButtonClicked ? (
        <KakaoLoginButton
          hasMarginBottom
          onClick={() => navigate(routes.join)}
        />
      ) : (
        <Button hasMarginBottom onClick={() => setIsButtonClicked(true)}>
          시작하기
        </Button>
      )}
      <Backdrop />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  max-width: ${(props) => props.theme.sizes.mobile};
  margin: 0 auto;
  width: 100%;
  padding: ${(props) => `0 ${props.theme.sizes.padding}`};
  /* box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1); */
  flex-direction: column;
  display: flex;
  min-height: 100vh;
`;

const StyledLogoWrapper = styled.div`
  align-items: center;
  flex: 1;
  display: flex;
  justify-content: center;
  ${getFontSizeAndWeight('heading1', 'bold')}
  img {
    width: 312px;
    height: 248px;
  }
`;
