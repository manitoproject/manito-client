import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes } from '../router';
import authService from '../services/auth';

export default function KakaoRedirection() {
  const navigate = useNavigate();
  const code = new URL(location.href).searchParams.get('code');
  const { data } = useQuery({
    queryFn: () => authService.getAccessToken(code),
    queryKey: ['auth', code],
  });
  useEffect(() => {
    if (data?.result === 'Success') {
      navigate(routes.join);
    } else {
      navigate(routes.index);
    }
  }, [data?.result, navigate]);

  return <StyledWrapper>KakaoRedirection</StyledWrapper>;
}

const StyledWrapper = styled.div``;
