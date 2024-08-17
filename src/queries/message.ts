import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { routes } from '../router';
import { createMessage, deleteMessage, editMessage } from '../services/message';
import useToastStore from '../stores/toast-store';
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
    staleTime: 1000 * 60 * 60 * 6, // 삭제 바람!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    enabled: !!paperId,
  });
};

export const useUserMessagesQuery = () => {
  return useQuery({
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
  closeModal,
}: {
  paperId: number;
  closeModal?: () => void;
}) => {
  const queryClient = useQueryClient();
  const { add } = useToastStore();
  return useMutation({
    mutationFn: deleteMessage,
    onSuccess: (data) => {
      if (data.result === 'Success') {
        if (closeModal) closeModal();
        add('편지가 삭제 되었습니다.');
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
