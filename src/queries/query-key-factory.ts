import {
  createQueryKeys,
  mergeQueryKeys,
} from '@lukemorales/query-key-factory';

import { getAccessToken } from '../services/auth';
import { getUser } from '../services/users';

const auth = createQueryKeys('auth', {
  token: (code: string) => ({
    queryFn: () => getAccessToken(code),
    queryKey: [code],
  }),
});

const users = createQueryKeys('users', {
  detail: () => ({
    queryKey: ['user'],
    queryFn: getUser,
  }),
});

const queries = mergeQueryKeys(auth, users);

export default queries;
