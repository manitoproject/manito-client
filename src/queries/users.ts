import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { routes } from '../router';
import { changeNickname, changeProfile, logout } from '../services/users';
import { useToastActions } from '../stores/toast-store';
import { token } from '../utils/storage';
import queries from './query-key-factory';

export const useUserQuery = () => {
  return useQuery({
    ...queries.users.detail(),
    enabled: !!token.getAccessToken(),
    staleTime: 1000 * 60 * 10,
  });
};

export const useNicknameChange = (isMyPage = false) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: changeNickname,
    onSuccess: (data) => {
      if (data.result === 'Success') {
        if (isMyPage) navigate(routes.my.default);
        else navigate(-1);
        queryClient.invalidateQueries({
          queryKey: queries.users._def,
        });
        queryClient.invalidateQueries({
          queryKey: queries.messages.paper._def,
        });
      }
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      if (data.result === 'Success') {
        token.removeToken();
        navigate(routes.index);
      }
    },
  });
};

export const useProfileChange = () => {
  const queryClient = useQueryClient();
  const toast = useToastActions();
  return useMutation({
    mutationFn: changeProfile,
    onSuccess: (data) => {
      if (data.result === 'Success') {
        queryClient.invalidateQueries({
          queryKey: queries.users._def,
        });
        toast.add('변경이 완료 되었습니다.');
      }
    },
  });
};
