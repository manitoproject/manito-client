import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { routes } from '../router';
import { changeNickname } from '../services/users';
import { token } from '../utils/storage';
import queries from './query-key-factory';

export function useUserQuery() {
  return useQuery({
    ...queries.users.detail(),
    enabled: !!token.getAccessToken,
  });
}

export function useNicknameChange() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: changeNickname,
    onSuccess: (data) => {
      if (data.result === 'Success') {
        navigate(routes.home);
      }
    },
  });
}
