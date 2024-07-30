import { useQuery } from '@tanstack/react-query';

import queries from './query-key-factory';

export const useTokenQuery = (code: string | null) => {
  return useQuery({
    ...queries.auth.token(code as string),
    enabled: !!code,
  });
};
