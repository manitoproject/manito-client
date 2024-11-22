import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import { messageQueries } from '@/lib/query-factory';
import routes from '@/routes';
import { createMessage, deleteMessage, editMessage } from '@/services/message';
import { useToastActions } from '@/stores/toast-store';

export const useCreateMessage = (
  paperId: number,
  content: RouteContentType,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toastActions = useToastActions();
  return useMutation({
    mutationFn: createMessage,
    onSuccess: (data) => {
      if (data.result === 'Success') {
        navigate(routes[content].list(paperId), { replace: true });
        queryClient.invalidateQueries({ queryKey: messageQueries.all() });
      }
      if (data.result === 'Fail') {
        if (data.description === 'Position is not available') {
          toastActions.add('이미 자리에 메시지가 존재합니다.');
          navigate(routes[content].list(paperId));
          queryClient.invalidateQueries({ queryKey: messageQueries.all() });
        }
      }
    },
  });
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  const toastActions = useToastActions();
  const location = useLocation();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: deleteMessage,
    onSuccess: (data) => {
      if (data.result === 'Success') {
        if (!location.pathname.includes('my')) navigate(-1);
        toastActions.add('편지가 삭제 되었습니다.');
        queryClient.invalidateQueries({
          queryKey: messageQueries.all(),
        });
      }
    },
  });
};
export const useEditMessage = ({
  content,
  messageId,
  paperId,
}: {
  content: RouteContentType;
  paperId: number;
  messageId?: number;
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: editMessage,
    onSuccess: (data) => {
      if (data.result === 'Success') {
        navigate(`${routes[content].detail(paperId)}?id=${messageId}`, {
          replace: true,
        });
        queryClient.invalidateQueries({
          queryKey: messageQueries.all(),
        });
      }
    },
  });
};
