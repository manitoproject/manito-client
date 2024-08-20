import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import routes from '../constants/routes';
import { createMessage, deleteMessage, editMessage } from '../services/message';
import { useToastActions } from '../stores/toast-store';
import queries from './query-key-factory';

export const useCreateMessage = (paperId: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createMessage,
    onSuccess: (data) => {
      if (data.result === 'Success') {
        navigate(routes.rollingpaper.detail(paperId));
        queryClient.invalidateQueries({ queryKey: queries.messages._def });
      }
    },
  });
};

export const usePaperMessagesQuery = () => {
  const { id } = useParams();
  return useQuery({
    ...queries.messages.paper(Number(id)),
    staleTime: 1000 * 60 * 60 * 6, // 삭제 바람!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    enabled: !!id,
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
  const toastActions = useToastActions();
  return useMutation({
    mutationFn: deleteMessage,
    onSuccess: (data) => {
      if (data.result === 'Success') {
        if (closeModal) closeModal();
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
