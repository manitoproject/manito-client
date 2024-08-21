import 'swiper/css';

import styled from '@emotion/styled';

import { usePaperMessagesQuery } from '../../../../queries/message';
import { useMessageScreenIndex } from '../../../../stores/message-screen-store';
import { Message } from '../../../../types/message';
import AuthorInfo from './author-info';
import MessageScreenButtons from './buttons';
import MessageScreenSwipe from './swipe';

interface MessageScreenProps {
  authorId?: number;
}

export default function MessageScreen({ authorId }: MessageScreenProps) {
  const { data: messageData, isError, isLoading } = usePaperMessagesQuery();
  const activeScreenIndex = useMessageScreenIndex();

  if (isError) throw new Error('usePaperMessagesQuery fetching error');
  if (isLoading) return null;

  const message = messageData?.data?.[
    activeScreenIndex
  ] as Message<UserIdAndNickname>;
  const messages = messageData?.data as Message<UserIdAndNickname>[];
  const sortedMessages = messages?.sort((a, b) => a.position - b.position);

  return (
    <StyledWrapper>
      <div>
        <MessageScreenSwipe messages={sortedMessages} />
        <AuthorInfo
          nickname={message?.anonymous || message?.user?.nickname}
          totalIndex={sortedMessages?.length}
        />
      </div>
      <MessageScreenButtons authorId={authorId} message={message} />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 50;
  justify-content: space-between;
  & > div:nth-of-type(1) {
    transform: ${({ theme }) => `translateY(-${theme.sizes.paddingTop})`};
    justify-content: center;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;
