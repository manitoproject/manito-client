import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import AuthorInfo from '@/components/rollingpaper/detail/author-info';
import DetailPageBottomButtons from '@/components/rollingpaper/detail/buttons';
import MessageSwipe from '@/components/swipe/message-swipe';
import ReactHelmet, { TITLE } from '@/helmet';
import useDetailIndex from '@/hooks/use-detail-index';
import useSetHeader from '@/hooks/use-set-header';
import { CAKE_THEME_PALETTES } from '@/lib/cake-decoration';
import { StyledBackdrop } from '@/pages/rollingpaper/list.style';
import queries from '@/queries/query-key-factory';
import { StyledContentOverlay } from '@/styles/styled';

export default function CakeDetail() {
  const params = useParams();
  const { data: messages } = useQuery({
    ...queries.messages.paper(Number(params.id)),
    select: (data) => data?.data,
  });
  const { activeIndex, setActiveIndex } = useDetailIndex(messages);
  const { data: paper } = useQuery({
    ...queries.papers.detail(Number(params.id)),
    select: (data) => data?.data,
  });
  useSetHeader({ title: '상세 보기' });

  if (!messages?.length) return null;
  const currentMessage = messages[activeIndex];
  return (
    <StyledWrapper>
      <StyledBackdrop
        bg={
          CAKE_THEME_PALETTES[
            activeIndex + 1 <= 13 ? 0 : activeIndex + 1 <= 26 ? 1 : 2
          ].bgUrl
        }
      />
      <StyledContentOverlay opacity={20} />
      <StyledContentWrapper>
        <MessageSwipe
          category="cake"
          messages={messages}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
        <AuthorInfo
          isNicknameWhite={activeIndex + 1 > 13 && activeIndex + 1 < 27}
          activeIndex={activeIndex}
          nickname={currentMessage?.anonymous || currentMessage?.user?.nickname}
          totalIndex={messages?.length}
        />
      </StyledContentWrapper>
      <DetailPageBottomButtons
        category="cake"
        authorId={paper?.userId}
        message={currentMessage}
      />
      <ReactHelmet title={`${paper?.title} - ${TITLE}`} />
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

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  gap: 12px;
  top: -10%;
  position: relative;
`;
