import { useMutation } from '@tanstack/react-query';

import { sendFeedbackMessage } from '../services/contact';
import useToastStore from '../stores/toast-store';

export const useSendFeedbackMessage = (
  setMessage: React.Dispatch<React.SetStateAction<string>>,
) => {
  const { add } = useToastStore();
  return useMutation({
    mutationFn: sendFeedbackMessage,
    onSuccess: () => {
      setMessage('');
      add('문의하기가 완료 되었습니다.');
    },
    onError: () => {
      add('잠시후 다시 시도해주세요.');
    },
  });
};
