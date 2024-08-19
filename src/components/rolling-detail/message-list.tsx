import styled from '@emotion/styled';
import { useEffect } from 'react';

import { usePaperMessagesQuery } from '../../queries/message';
import {
  useActiveMessageIndex,
  useMessageActions,
  useMessageList,
} from '../../stores/message-store';
import MessageItem from './message-item';

interface MessageListProps {
  paperId?: number;
}

export default function MessageList({ paperId }: MessageListProps) {
  const { data } = usePaperMessagesQuery(paperId);
  const messageList = useMessageList();
  const messageActions = useMessageActions();
  const activeIndex = useActiveMessageIndex();

  const handleMessageClick = (i: number) => {
    if (i !== activeIndex) messageActions.setActiveEmojiName(null);
    messageActions.setActiveMessageIndex(i);
  };

  useEffect(() => {
    messageActions.snycList(data?.data);
    return () => messageActions.reset();
  }, [data, messageActions]);
  return (
    <StyledList>
      {messageList.map((message, i) => (
        <MessageItem
          key={i}
          message={message}
          onMessageClick={() => handleMessageClick(i)}
        />
      ))}
    </StyledList>
  );
}

export const StyledList = styled.ul`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);
`;
