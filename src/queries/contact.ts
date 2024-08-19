import { useMutation } from '@tanstack/react-query';

import { sendFeedbackMessage } from '../services/contact';
import { useToastActions } from '../stores/toast-store';

export const useSendFeedbackMessage = (
  setMessage: React.Dispatch<React.SetStateAction<string>>,
) => {
  const toastActions = useToastActions();
  return useMutation({
    mutationFn: sendFeedbackMessage,
    onSuccess: () => {
      setMessage('');
      toastActions.add('문의하기가 완료 되었습니다.');
    },
    onError: () => {
      toastActions.add('잠시후 다시 시도해주세요.');
    },
  });
};
