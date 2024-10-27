import styled from '@emotion/styled';
import { useEffect } from 'react';

import MessageItem from '@/components/rollingpaper/list/message-item';
import { MyMessageListSkeleton } from '@/components/skeletons/skeletons';
import { usePaperMessagesQuery } from '@/queries/message';
import {
  useMessageActions,
  useMessageList,
} from '@/stores/message-index-store';

export default function MessageList() {
  const { data, isLoading } = usePaperMessagesQuery();
  const messageList = useMessageList();
  const messageActions = useMessageActions();
  useEffect(() => {
    messageActions.snycList(data?.data);
  }, [data, messageActions]);

  if (isLoading) return <MyMessageListSkeleton />;

  return (
    <StyledList>
      {messageList.map((message, i) => (
        <MessageItem position={i} key={i} message={message} />
      ))}
    </StyledList>
  );
}

export const StyledList = styled.ul`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);
`;
