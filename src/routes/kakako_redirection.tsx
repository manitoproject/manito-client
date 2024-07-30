import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTokenQuery } from '../queries/auth';
import { routes } from '../router';
import { token } from '../utils/storage';

export default function KakaoRedirection() {
  const code = new URL(location.href).searchParams.get('code');
  const { data } = useTokenQuery(code);
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.data) {
      token.setAccessToken(data.data.accessToken);
      if (data.data.isNewUser === 'Y') {
        navigate(routes.join, { replace: true });
      } else {
        navigate(routes.home, { replace: true });
      }
    }
    if (!code) {
      navigate(routes.index, { replace: true });
    }
  }, [code, data, navigate]);

  return null;
}
