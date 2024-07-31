import styled from '@emotion/styled';
import { useEffect } from 'react';

import { usePaperMessagesQuery } from '../../queries/message';
import useMessageStore from '../../stores/message-store';
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
  const {
    setActiveMessageIndex,
    activeMessageIndex,
    setActiveEmojiIndex,
    list,
    snycList,
    reset,
  } = useMessageStore();

  const handleMessageClick = (i: number) => {
    if (i !== activeMessageIndex) {
      setActiveEmojiIndex(null);
    }
    setActiveMessageIndex(i);
    onBottomSheetOpen(true);
  };

  useEffect(() => {
    snycList(data?.data);
    return () => reset();
  }, [data, reset, snycList]);
  return (
    <StyledList>
      {list.map((message, i) => (
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
