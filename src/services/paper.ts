import { requester, RequesterWithoutToken } from '.';

export const createRollingPaper = async ({
  category,
  theme,
  title,
}: PaperCreateType) => {
  const { data } = await requester.post<DeatultResponse<Pick<Paper, 'id'>>>(
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
  const { data } = await requester.get<DeatultResponse<Paper[]>>(
    `/paper/user/${userId}`,
  );
  return data;
};

export const getPerperDetail = async (paperId?: string) => {
  if (!paperId) return null;
  const { data } = await RequesterWithoutToken.get<
    DeatultResponse<PaperDetail>
  >(`/paper/id/${paperId}`);
  return data;
};

export const deletePaper = async (paperId?: number) => {
  if (!paperId) return null;
  const { data } = await requester.delete<DeatultResponse<null>>(`/paper`, {
    data: {
      id: paperId,
    },
  });
  return data;
};
