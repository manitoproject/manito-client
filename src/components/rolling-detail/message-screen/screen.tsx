import 'swiper/css';

import styled from '@emotion/styled';

import { usePaperMessagesQuery } from '../../../queries/message';
import { useMessageScreenIndex } from '../../../stores/message-screen-store';
import AuthorInfo from './author-info';
import MessageScreenButtons from './buttons';
import MessageScreenSwipe from './swipe';

interface MessageScreenProps {
  paperId?: number;
  userId?: number;
}

export default function MessageScreen({ paperId, userId }: MessageScreenProps) {
  const { data: messageData } = usePaperMessagesQuery(paperId);
  const activeIndex = useMessageScreenIndex();
  const message = messageData?.data?.[activeIndex];
  const messages = messageData?.data;
  if (!message || !messages) throw new Error();

  return (
    <StyledWrapper>
      <div>
        <MessageScreenSwipe messages={messages} activeIndex={activeIndex} />
        <AuthorInfo
          nickname={message.anonymous || message.user?.nickname}
          activeIndex={activeIndex}
          totalIndex={messages.length}
        />
      </div>
      <MessageScreenButtons userId={userId} message={message} />
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
