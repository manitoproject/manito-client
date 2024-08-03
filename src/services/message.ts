import { CreateMessageApiParams, Message } from '../types/message';
import { requester, RequesterWithoutToken } from '.';

export const createMessage = async (messageInfo: CreateMessageApiParams) => {
  const { data } = await requester.post<DeatultResponse<null>>(
    `/message`,
    messageInfo,
  );
  return data;
};

export const getPaperMessages = async (paperId?: number) => {
  if (!paperId) return null;
  const { data } = await RequesterWithoutToken.get<DeatultResponse<Message[]>>(
    `/message/paper/${paperId}`,
  );
  return data;
};

export const deleteMessage = async (messageId: number) => {
  const { data } = await requester.delete<DeatultResponse<null>>('/message', {
    data: {
      id: messageId,
    },
  });
  return data;
};

export const getUserMessages = async () => {
  const { data } = await requester.get<DeatultResponse<Message[]>>(`/message`);
  return data;
};

export const editMessage = async (
  message: Pick<Message, 'id' | 'content' | 'font' | 'fontColor' | 'anonymous'>,
) => {
  const { data } = await requester.put<DeatultResponse<null>>(`/message`, {
    data: message,
  });
  return data;
};
