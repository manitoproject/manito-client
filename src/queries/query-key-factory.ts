import {
  createQueryKeys,
  mergeQueryKeys,
} from '@lukemorales/query-key-factory';

import { getAccessToken } from '../services/auth';
import { getPaperByUserId } from '../services/paper';
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

const paper = createQueryKeys('paper', {
  deatil: (userId?: number) => ({
    queryKey: [userId],
    queryFn: () => getPaperByUserId(userId),
  }),
});

const queries = mergeQueryKeys(auth, users, paper);

export default queries;
