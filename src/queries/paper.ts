import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import routes from '../routes';
import { createRollingpaper, deletePaper } from '../services/paper';
import { useToastActions } from '../stores/toast-store';
import queries from './query-key-factory';

export const useCreateRollingpaper = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRollingpaper,
    onSuccess: (data) => {
      navigate(routes.rollingpaper.list(data.data?.id));
      queryClient.invalidateQueries({
        queryKey: queries.papers.user._def,
      });
    },
  });
};

export const useUserPaperQuery = (userId?: number) => {
  return useQuery({
    ...queries.papers.user(userId),
    staleTime: 1000 * 60 * 60,
    enabled: !!userId,
  });
};

export const usePaperDetailQuery = () => {
  const { id } = useParams();
  const query = useQuery({
    ...queries.papers.detail(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 6, // 삭제 바람!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  });

  if (query.isError || query.data?.result === 'Fail') throw new Error();
  return query;
};

export const useDeletePaper = () => {
  const queryClient = useQueryClient();
  const toastActions = useToastActions();
  return useMutation({
    mutationFn: deletePaper,
    onSuccess: (data) => {
      if (data?.result === 'Success') {
        toastActions.add('컨텐츠가 삭제 되었습니다.');
        queryClient.invalidateQueries({
          queryKey: queries.papers.user._def,
        });
        queryClient.invalidateQueries({
          queryKey: queries.messages.user._def,
        });
      }
    },
  });
};
