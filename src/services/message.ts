import { DeatultResponse } from '../types/axios';
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
