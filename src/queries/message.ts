import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { routes } from '../router';
import { createMessage, deleteMessage } from '../services/message';
import messageStore from '../stores/messageStore';
import queries from './query-key-factory';

export const useCreateMessage = (paperId: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createMessage,
    onSuccess: (data) => {
      if (data.result === 'Success') {
        navigate(routes.rolling.detail(paperId));
        queryClient.invalidateQueries({ queryKey: queries.messages._def });
      }
    },
  });
};

export const usePaperMessagesQuery = (paperId?: number) => {
  return useQuery({
    ...queries.messages.paper(paperId),
    staleTime: 1000 * 60 * 60,
    enabled: !!paperId,
  });
};

export const useDeleteMessage = ({
  paperId,
  meesageId,
}: {
  meesageId: number;
  paperId?: number;
}) => {
  const queryClient = useQueryClient();
  const { removeList } = messageStore();
  return useMutation({
    mutationFn: deleteMessage,
    onSuccess: (data) => {
      if (data.result === 'Success') {
        removeList(meesageId);
        queryClient.invalidateQueries({
          queryKey: queries.messages.paper(paperId).queryKey,
        });
      }
    },
  });
};
