import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Content } from '@/components/modal/create-message-modal';
import { messageQueries } from '@/lib/query-factory';
import routes from '@/routes';
import { createMessage, deleteMessage, editMessage } from '@/services/message';
import { useToastActions } from '@/stores/toast-store';

export const useCreateMessage = (paperId: number, content: Content) => {
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

export const useDeleteMessage = ({
  isDetailPaer = false,
}: {
  isDetailPaer?: boolean;
}) => {
  const queryClient = useQueryClient();
  const toastActions = useToastActions();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: deleteMessage,
    onSuccess: (data) => {
      if (data.result === 'Success') {
        if (isDetailPaer) navigate(-1);
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
  content: Content;
  paperId: number;
  messageId?: number;
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: editMessage,
    onSuccess: (data) => {
      if (data.result === 'Success') {
        navigate(`${routes[content].detail(paperId)}?id=${messageId}`);
        queryClient.invalidateQueries({
          queryKey: messageQueries.all(),
        });
      }
    },
  });
};
