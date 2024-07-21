import {
  createQueryKeys,
  mergeQueryKeys,
} from '@lukemorales/query-key-factory';

import { getAccessToken } from '../services/auth';
import { getPaperMessages } from '../services/message';
import { getPaperByUserId, getPerperDetail } from '../services/paper';
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

const papers = createQueryKeys('papers', {
  all: (userId?: number) => ({
    queryKey: [userId],
    queryFn: () => getPaperByUserId(userId),
  }),
  detail: (paperId?: string) => ({
    queryKey: [paperId],
    queryFn: () => getPerperDetail(paperId),
  }),
});

const messages = createQueryKeys('messages', {
  paper: (paperId?: number) => ({
    queryKey: [paperId],
    queryFn: () => getPaperMessages(paperId),
  }),
});

const queries = mergeQueryKeys(auth, users, papers, messages);

export default queries;
