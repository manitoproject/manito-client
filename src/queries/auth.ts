import { useQuery } from '@tanstack/react-query';

import queries from './query-key-factory';

export function useTokenQuery(code: string | null) {
  return useQuery({
    ...queries.auth.token(code as string),
    enabled: !!code,
  });
}
