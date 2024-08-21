import styled from '@emotion/styled';
import { useEffect } from 'react';

import { usePaperMessagesQuery } from '../../../queries/message';
import {
  useMessageActions,
  useMessageList,
} from '../../../stores/message-store';
import { MyMessageListSkeleton } from '../../skeletons/skeletons';
import MessageItem from './message-item';

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
