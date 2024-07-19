import { useMutation } from '@tanstack/react-query';

import { createRollingPaper } from '../services/paper';

export const useCreateRollingPaper = () => {
  return useMutation({
    mutationFn: createRollingPaper,
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
