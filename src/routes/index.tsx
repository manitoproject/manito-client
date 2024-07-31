import styled from '@emotion/styled';
import { useState } from 'react';

import { Logo } from '../assets/svg/icons';
import { Button, KakaoLoginButton } from '../components/common/buttons';
import theme from '../styles/theme';
import { getFontSizeAndWeight } from '../utils/style';
import { StyledBrowserBackdrop } from './layout.style';

export default function Index() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const handleSocialLoginKakao = () => {
    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const cleintUrl = import.meta.env.VITE_CLIENT_URL;
    const redirectPath = import.meta.env.VITE_KAKAO_REDIRECT_PATH;
    location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${cleintUrl}${redirectPath}`;
  };

  return (
    <StyledWrapper>
      <StyledLogoWrapper>
        <Logo />
      </StyledLogoWrapper>
      {isButtonClicked ? (
        <KakaoLoginButton
          css={{ marginBottom: theme.sizes.paddingBottom }}
          onClick={handleSocialLoginKakao}
        />
      ) : (
        <Button
          css={{ marginBottom: theme.sizes.paddingBottom }}
          onClick={() => setIsButtonClicked(true)}
        >
          시작하기
        </Button>
      )}
      <StyledBrowserBackdrop />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  max-width: ${(props) => props.theme.sizes.mobile};
  margin: 0 auto;
  width: 100%;
  padding: ${(props) => `0 ${props.theme.sizes.padding}`};
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
