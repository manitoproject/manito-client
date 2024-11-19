import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { messageQueries, userQueries } from '@/lib/query-factory';
import { token } from '@/lib/storage';
import routes from '@/routes';
import { changeNickname, changeProfile, logout } from '@/services/users';
import { useToastActions } from '@/stores/toast-store';

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
          queryKey: userQueries.detail().queryKey,
        });
        queryClient.invalidateQueries({
          queryKey: messageQueries.papers(),
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
        navigate(routes.landing);
      }
    },
  });
};

export const useProfileChange = () => {
  const queryClient = useQueryClient();
  const toastActions = useToastActions();
  return useMutation({
    mutationFn: changeProfile,
    onSuccess: (data) => {
      if (data.result === 'Success') {
        queryClient.invalidateQueries({
          queryKey: userQueries.detail().queryKey,
        });
        toastActions.add('변경이 완료 되었습니다.');
      }
    },
  });
};
