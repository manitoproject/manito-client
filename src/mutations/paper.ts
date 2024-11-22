import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { messageQueries, paperQueries } from '@/lib/query-factory';
import routes from '@/routes';
import { createPaper, deletePaper } from '@/services/paper';
import { useToastActions } from '@/stores/toast-store';

export const useCreatePaper = (content: RouteContentType) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPaper,
    onSuccess: (data) => {
      navigate(routes[content].list(data.data?.id));
      queryClient.invalidateQueries({
        queryKey: paperQueries.users(),
      });
    },
  });
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
          queryKey: paperQueries.users(),
        });
        queryClient.invalidateQueries({
          queryKey: messageQueries.user().queryKey,
        });
      }
    },
  });
};
