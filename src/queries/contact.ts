import { useMutation } from '@tanstack/react-query';

import { sendFeedbackMessage } from '../services/contact';
import { useToastActions } from '../stores/toast-store';

export const useSendFeedbackMessage = (
  setMessage: React.Dispatch<React.SetStateAction<string>>,
) => {
  const toast = useToastActions();
  return useMutation({
    mutationFn: sendFeedbackMessage,
    onSuccess: () => {
      setMessage('');
      toast.add('문의하기가 완료 되었습니다.');
    },
    onError: () => {
      toast.add('잠시후 다시 시도해주세요.');
    },
  });
};
