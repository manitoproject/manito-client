import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { routes } from '../router';
import { changeNickname, logout } from '../services/users';
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
