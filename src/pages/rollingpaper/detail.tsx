import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import AuthorInfo from '@/components/rollingpaper/detail/author-info';
import DetailPageBottomButtons from '@/components/rollingpaper/detail/buttons';
import MessageSwipe from '@/components/swipe/message-swipe';
import ReactHelmet, { TITLE } from '@/helmet';
import useDetailIndex from '@/hooks/use-detail-index';
import useSetHeader from '@/hooks/use-set-header';
import { ROLLINGPAPER_BG_MAP } from '@/lib/rolling-paper';
import { StyledBackdrop } from '@/pages/rollingpaper/list.style';
import queries from '@/queries/query-key-factory';

export default function RollingpaperDetail() {
  const params = useParams();
  const { data: messages } = useQuery({
    ...queries.messages.paper(Number(params.id)),
    select: (data) => data?.data,
  });
  const { data: paper } = useQuery({
    ...queries.papers.detail(Number(params.id)),
    select: (data) => data?.data,
  });
  const { activeIndex, setActiveIndex } = useDetailIndex(messages);
  useSetHeader({
    title: paper?.title,
    bg: ROLLINGPAPER_BG_MAP[paper?.theme ?? 'animal'].bgColor,
    color: paper?.theme === 'animal' ? undefined : 'white',
  });

  if (!messages?.length) return null;
  const currentMessage = messages[activeIndex];

  return (
    <StyledWrapper>
      <div>
        <MessageSwipe
          category="rollingpaper"
          messages={messages}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
        <AuthorInfo
          activeIndex={activeIndex}
          nickname={currentMessage?.anonymous || currentMessage?.user?.nickname}
          totalIndex={messages?.length}
        />
      </div>
      <DetailPageBottomButtons
        category="rollingpaper"
        authorId={paper?.userId}
        message={currentMessage}
      />
      <ReactHelmet title={`${paper?.title} - ${TITLE}`} />
      <StyledBackdrop
        bg={ROLLINGPAPER_BG_MAP[paper?.theme ?? 'animal'].bgUrl}
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
