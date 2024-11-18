import { apiRequester, apiRequesterWithoutToken } from '@/services';

export const createPaper = async ({
  category,
  theme,
  title,
}: PaperCreateType) => {
  const { data } = await apiRequester.post<DeatultResponse<UserIdAndNickname>>(
    '/paper',
    {
      title,
      category,
      theme,
    },
  );
  return data;
};

export const getPaperByUserId = async (userId?: number) => {
  if (!userId) return null;
  const { data } = await apiRequester.get<DeatultResponse<Paper[]>>(
    `/paper/user/${userId}`,
  );
  return data;
};

export const getPerperDetail = async (paperId?: number) => {
  if (!paperId) return null;
  const { data } = await apiRequesterWithoutToken.get<
    DeatultResponse<PaperDetail>
  >(`/paper/id/${paperId}`);
  return data;
};

export const deletePaper = async (paperId?: number) => {
  if (!paperId) return null;
  const { data } = await apiRequester.delete<DeatultResponse<null>>(`/paper`, {
    data: {
      id: paperId,
    },
  });
  return data;
};
