import {
  createQueryKeys,
  mergeQueryKeys,
} from '@lukemorales/query-key-factory';

import { getAccessToken } from '@/services/auth';
import {
  getMessageCounts,
  getPaperMessages,
  getUserMessages,
} from '@/services/message';
import { getPaperByUserId, getPerperDetail } from '@/services/paper';
import { getUser } from '@/services/users';

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

const papers = createQueryKeys('papers', {
  user: (userId?: number) => ({
    queryKey: [userId],
    queryFn: () => (userId ? getPaperByUserId(userId) : null),
  }),
  detail: (paperId?: number) => ({
    queryKey: [paperId],
    queryFn: () => getPerperDetail(paperId),
  }),
});

const messages = createQueryKeys('messages', {
  paper: (paperId?: number) => ({
    queryKey: [paperId],
    queryFn: () => getPaperMessages(paperId),
  }),
  user: () => ({
    queryFn: getUserMessages,
    queryKey: ['user'],
  }),
  counts: (theme: CategoryLowerCase) => ({
    queryKey: [theme],
    queryFn: () => getMessageCounts(theme),
  }),
});

const queries = mergeQueryKeys(auth, users, papers, messages);

export default queries;
