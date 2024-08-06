import { CreateMessageApiParams, Message } from '../types/message';
import { apiRequester, apiRequesterWithoutToken } from '.';

export const createMessage = async (messageInfo: CreateMessageApiParams) => {
  const { data } = await apiRequester.post<DeatultResponse<null>>(
    `/message`,
    messageInfo,
  );
  return data;
};

export const getPaperMessages = async (paperId?: number) => {
  if (!paperId) return null;
  const { data } = await apiRequesterWithoutToken.get<
    DeatultResponse<Message[]>
  >(`/message/paper/${paperId}`);
  return data;
};

export const deleteMessage = async (messageId: number) => {
  const { data } = await apiRequester.delete<DeatultResponse<null>>(
    '/message',
    {
      data: {
        id: messageId,
      },
    },
  );
  return data;
};

export const getUserMessages = async () => {
  const { data } = await apiRequester.get<DeatultResponse<Message[]>>(
    `/message`,
  );
  return data;
};

export const editMessage = async (
  message: Pick<Message, 'id' | 'content' | 'font' | 'fontColor' | 'anonymous'>,
) => {
  const { data } = await apiRequester.put<DeatultResponse<null>>(
    `/message`,
    message,
  );
  return data;
};
