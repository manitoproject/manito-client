import { queryOptions } from '@tanstack/react-query';

import { getAccessToken } from '@/services/auth';
import {
  getMessageCounts,
  getPaperMessages,
  getUserMessages,
} from '@/services/message';
import { getPaperByUserId, getPerperDetail } from '@/services/paper';
import { getUser } from '@/services/users';

const authQueries = {
  auth: (code: string | null) =>
    queryOptions({
      queryFn: () => getAccessToken(code),
      queryKey: ['auth', code],
      select: (data) => data?.data,
    }),
};

const userQueries = {
  detail: () =>
    queryOptions({
      queryFn: getUser,
      queryKey: ['user'],
      staleTime: 1000 * 60 * 10,
      select: (data) => data.data,
    }),
};

const paperQueries = {
  all: () => ['papers'],
  users: () => [...paperQueries.all(), 'users'],
  user: (userId?: number) =>
    queryOptions({
      queryFn: () => getPaperByUserId(userId),
      queryKey: [...paperQueries.users(), userId],
      select: (data) =>
        data?.data?.sort(
          (a, b) => +new Date(b.regDateTime) - +new Date(a.regDateTime),
        ),
      staleTime: 1000 * 60 * 60,
    }),
  details: () => [...paperQueries.all(), 'details'],
  detail: (paperId?: number) =>
    queryOptions({
      queryFn: () => getPerperDetail(paperId),
      queryKey: [...paperQueries.details(), paperId],
      select: (data) => data?.data,
    }),
};

const messageQueries = {
  all: () => ['messages'],
  papers: () => [...messageQueries.all(), 'papers'],
  paper: (paperId?: number) =>
    queryOptions({
      queryFn: () => getPaperMessages(paperId),
      queryKey: [...messageQueries.papers(), paperId],
      select: (data) => data?.data?.sort((a, b) => a.position - b.position),
    }),
  user: () =>
    queryOptions({
      queryFn: getUserMessages,
      queryKey: [...messageQueries.all(), 'users'],
      staleTime: 1000 * 60 * 60,
      select: (data) =>
        data.data?.sort(
          (a, b) => +new Date(b.regDateTime) - +new Date(a.regDateTime),
        ),
    }),
  counts: () => [...messageQueries.all(), 'counts'],
  count: (theme: CategoryLowerCase) =>
    queryOptions({
      queryFn: () => getMessageCounts(theme),
      queryKey: [...messageQueries.counts(), theme],
      select: (data) => data?.data,
    }),
};

export { authQueries, messageQueries, paperQueries, userQueries };
