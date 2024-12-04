import { QueryClient } from '@tanstack/react-query';
import { redirect } from 'react-router-dom';

import { authQueries, userQueries } from '@/lib/query-factory';
import routes from '@/routes';

export const authTokenLoader =
  (queryClient: QueryClient) =>
  ({ request }: { request: Request }) => {
    const searchParams = new URL(request.url).searchParams;
    const code = searchParams.get('code');
    return queryClient.ensureQueryData(authQueries.auth(code));
  };

export const privateGuardLoader = (queryClient: QueryClient) => async () => {
  const { data: user } = await queryClient.ensureQueryData(
    userQueries.detail(),
  );

  if (!user) return redirect('/');
  return user;
};

export const publicGuardLoader = (queryClient: QueryClient) => async () => {
  const { data: user } = await queryClient.ensureQueryData(
    userQueries.detail(),
  );

  if (user) return redirect(routes.home);
  return user;
};
