import { useTokenQuery } from '../queries/auth';

export default function KakaoRedirection() {
  const code = new URL(location.href).searchParams.get('code');
  useTokenQuery(code);

  return null;
}
