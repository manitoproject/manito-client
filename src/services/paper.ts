import { DeatultResponse } from '../types/axios';
import { Paper, PaperCreateType } from '../types/paper';
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

export const getPaperByUserId = async (userId?: number) => {
  if (!userId) return null;
  const { data } = await requester.get<DeatultResponse<Paper[]>>(
    `/paper/user/${userId}`,
  );
  return data;
};
