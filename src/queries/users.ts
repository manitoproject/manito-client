import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { routes } from '../router';
import { changeNickname } from '../services/users';
import { token } from '../utils/storage';
import queries from './query-key-factory';

export function useUserQuery() {
  return useQuery({
    ...queries.users.detail(),
    enabled: !!token.getAccessToken,
    staleTime: 1000 * 60 * 10,
  });
}

export function useNicknameChange(isMyPage = false) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: changeNickname,
    onSuccess: (data) => {
      if (data.result === 'Success') {
        if (isMyPage) navigate(routes.home);
        else navigate(-1);
        queryClient.invalidateQueries({
          queryKey: queries.users._def,
        });
      }
    },
  });
}
