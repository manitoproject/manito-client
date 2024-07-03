import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Logo } from '../assets/svg';
import { Button, KakaoLoginButton } from '../components/common/buttons';
import { getFontSizeAndWeight } from '../styles/utils';
export default function Index() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const navigate = useNavigate();
  return (
    <StyledWrapper>
      <StyledLogoWrapper>
        <Logo />
      </StyledLogoWrapper>
      {isButtonClicked ? (
        <KakaoLoginButton mb={50} onClick={() => navigate('/join')} />
      ) : (
        <Button mb={50} onClick={() => setIsButtonClicked(true)}>
          시작하기
        </Button>
      )}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  max-width: ${(props) => props.theme.sizes.mobile};
  margin: 0 auto;
  padding: ${(props) => `0 ${props.theme.sizes.padding}`};
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
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
`;
