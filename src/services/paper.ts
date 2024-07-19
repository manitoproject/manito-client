import { PaperCreateType } from '../types/paper';
import { requester } from '.';

export const createRollingPaper = async ({
  category,
  theme,
  title,
}: PaperCreateType) => {
  const { data } = await requester.post('/paper', {
    title,
    category,
    theme,
  });
  return data;
};
