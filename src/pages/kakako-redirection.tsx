import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { StyledBrowserBackdrop } from '@/pages/layout.style';
import { useTokenQuery } from '@/queries/auth';
import routes from '@/routes';
import { token } from '@/lib/storage';

export default function KakaoRedirection() {
  const code = new URL(location.href).searchParams.get('code');
  const { data, isError } = useTokenQuery(code);
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.data) {
      token.setAccessToken(data.data.accessToken);
      if (data.data.isNewUser === 'Y') {
        navigate(routes.signup, { replace: true, state: data.data.isNewUser });
      } else {
        navigate(routes.home, { replace: true });
      }
    }
    if (!code) {
      navigate(routes.landing, { replace: true });
    }
  }, [code, data, navigate]);

  if (isError) throw Error();

  return (
    <StyledWrapper>
      <StyledSpinner />
      <StyledBackdrop />
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
  justify-content: center;
  align-items: center;
`;

const StyledSpinner = styled.div`
  /* margin: calc(50% - 25px) auto; */
  width: 100px;
  height: 100px;
  z-index: 1;
  position: relative;
  border: 10px solid #cbd9ef;
  box-sizing: border-box;
  border-left-color: #4788eb;
  border-radius: 100%;
  animation: spin 1.2s ease-in-out infinite;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const StyledBackdrop = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 0;
  right: 0;
  top: 0;
  background-color: #00000010;
`;
