import styled from '@emotion/styled';
import { useEffect } from 'react';

import { ThemeKey } from '../../constants/theme-list';
import { usePaperMessagesQuery } from '../../queries/message';
import messageStore from '../../stores/messageStore';
import MessageItem from './message-item';

interface MessageListProps {
  onBottomSheetOpen: (status: boolean) => void;
  paperId?: number;
  theme: ThemeKey;
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
  } = messageStore();

  const handleMessageClick = (i: number) => {
    if (i !== activeMessageIndex) {
      setActiveEmojiIndex(null);
    }
    setActiveMessageIndex(i);
    onBottomSheetOpen(true);
  };

  useEffect(() => {
    snycList(data?.data);
  }, [data, snycList]);

  return (
    <StyledList>
      {list.map((message, i) => (
        <MessageItem
          onBottomSheetOpen={onBottomSheetOpen}
          key={i}
          message={message}
          // emoji={emoji?.svg}
          onMessageClick={() => handleMessageClick(i)}
        />
      ))}
    </StyledList>
  );
}

const StyledList = styled.ul`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);
`;
