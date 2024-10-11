import styled from '@emotion/styled';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import AuthorInfo from '@/components/rollingpaper/detail/author-info';
import DetailMessageButtons from '@/components/rollingpaper/detail/buttons';
import MessageSwipe from '@/components/rollingpaper/detail/swipe';
import ReactHelmet, { TITLE } from '@/helmet';
import { useSetHeader } from '@/hooks';
import { usePaperMessagesQuery } from '@/queries/message';
import { usePaperDetailQuery } from '@/queries/paper';
import { BG_BY_THEME } from '@/routes/rollingpaper/list';
import { StyledBackdrop } from '@/routes/rollingpaper/list.style';
import { Message } from '@/types/message';

export default function RollingpaperDetail() {
  const location = useLocation();
  const { data: messageData, isError, isLoading } = usePaperMessagesQuery();
  const { data: paperData } = usePaperDetailQuery();

  const target = messageData?.data?.findIndex((a) => a.id === location.state);
  const [activeIndex, setActiveIndex] = useState(
    !target || target === -1 ? 0 : target,
  );
  const paper = paperData?.data;
  useSetHeader({
    title: paper?.title,
    bg: BG_BY_THEME[paper?.theme ?? 'animal'].bgColor,
    color: paper?.theme === 'animal' ? undefined : 'white',
  });

  if (isError) throw new Error('usePaperMessagesQuery fetching error');
  if (isLoading) return null;

  const messages = messageData?.data as Message<UserIdAndNickname>[];
  const sortedMessages = messages?.sort((a, b) => a.position - b.position);
  const currentMessage = messages[activeIndex] as Message<UserIdAndNickname>;

  return (
    <StyledWrapper>
      <div>
        <MessageSwipe
          messages={sortedMessages}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
        <AuthorInfo
          activeIndex={activeIndex}
          nickname={currentMessage?.anonymous || currentMessage?.user?.nickname}
          totalIndex={sortedMessages?.length}
        />
      </div>
      <DetailMessageButtons
        authorId={paperData?.data?.userId}
        message={currentMessage}
      />
      <ReactHelmet title={`${paperData?.data?.title} - ${TITLE}`} />
      <StyledBackdrop
        bg={BG_BY_THEME[paperData?.data?.theme ?? 'animal'].bgUrl}
      />
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > div:nth-of-type(1) {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.sizes.paddingTop};
  }
`;
