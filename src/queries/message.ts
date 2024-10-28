import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { Content } from '@/components/modal/message-create-modal';
import queries from '@/queries/query-key-factory';
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
        queryClient.invalidateQueries({ queryKey: queries.messages._def });
      }
      if (data.result === 'Fail') {
        if (data.description === 'Position is not available') {
          toastActions.add('이미 자리에 메시지가 존재합니다.');
          navigate(routes[content].list(paperId));
          queryClient.invalidateQueries({ queryKey: queries.messages._def });
        }
      }
    },
  });
};

export const usePaperMessagesQuery = () => {
  const { id } = useParams();
  const query = useQuery({
    ...queries.messages.paper(Number(id)),
    enabled: !!id,
    select: (data) => {
      return data?.data?.sort((a, b) => a.position - b.position);
    },
  });

  if (query.isError) throw new Error('usePaperMessagesQuery fetching error');

  return query;
};

export const useUserMessagesSuspenseQuery = () => {
  return useSuspenseQuery({
    ...queries.messages.user(),
    staleTime: 1000 * 60 * 60,
    select: (data) => {
      if (data.data) {
        const newData = { ...data };
        newData['data'] = [...data.data.reverse()];
        return newData;
      }
      return data;
    },
  });
};

export const useDeleteMessage = ({
  paperId,
  isDetailPaer = false,
}: {
  paperId: number;
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
          queryKey: queries.messages.paper(paperId).queryKey,
        });
        queryClient.invalidateQueries({
          queryKey: queries.messages.user._def,
        });
      }
    },
  });
};
export const useEditMessage = (paperId: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: editMessage,
    onSuccess: (data) => {
      if (data.result === 'Success') {
        navigate(-1);
        queryClient.invalidateQueries({
          queryKey: queries.messages.paper(paperId).queryKey,
        });
        queryClient.invalidateQueries({
          queryKey: queries.messages.user._def,
        });
      }
    },
  });
};
export const useMessageCounts = (theme: CategoryLowerCase) => {
  return useQuery({
    ...queries.messages.counts(theme),
  });
};
