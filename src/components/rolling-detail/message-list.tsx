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
  onBottomSheetOpen: (status: boolean) => void;
  paperId?: number;
}

export default function MessageList({
  onBottomSheetOpen,
  paperId,
}: MessageListProps) {
  const { data } = usePaperMessagesQuery(paperId);
  const messageList = useMessageList();
  const messageActions = useMessageActions();
  const activeIndex = useActiveMessageIndex();

  const handleMessageClick = (i: number) => {
    if (i !== activeIndex) messageActions.setActiveEmojiName(null);
    messageActions.setActiveMessageIndex(i);
    onBottomSheetOpen(true);
  };

  useEffect(() => {
    messageActions.snycList(data?.data);
    return () => messageActions.reset();
  }, [data, messageActions]);
  return (
    <StyledList>
      {messageList.map((message, i) => (
        <MessageItem
          onBottomSheetOpen={onBottomSheetOpen}
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
