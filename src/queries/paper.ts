import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';

import { createRollingPaper } from '../services/paper';
import queries from './query-key-factory';

export const useCreateRollingPaper = () => {
  return useMutation({
    mutationFn: createRollingPaper,
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export const usePaperQuery = (userId?: number) => {
  return useQuery({
    ...queries.paper.deatil(userId),
    staleTime: 1000 * 60 * 60,
    enabled: !!userId,
  });
};
