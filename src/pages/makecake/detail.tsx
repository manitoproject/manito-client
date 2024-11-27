import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import DetailActionButtons from '@/components/detail/action-buttons';
import DetailAuthorInfo from '@/components/detail/author-info';
import MessageSwiper from '@/components/swiper/message-swiper';
import ReactHelmet, { TITLE } from '@/helmet';
import useDetailIndex from '@/hooks/use-detail-index';
import useSetHeader from '@/hooks/use-set-header';
import { CAKE_THEME_PALETTES } from '@/lib/cake-decoration';
import { messageQueries, paperQueries } from '@/lib/query-factory';
import { StyledBackdrop } from '@/pages/rollingpaper/list.style';
import { StyledContentOverlay } from '@/styles/styled';

export default function MakeCakeDetail() {
  const params = useParams();
  const { data: messages } = useQuery(messageQueries.paper(Number(params?.id)));
  const { activeIndex, setActiveIndex } = useDetailIndex(messages);
  const { data: paper } = useQuery(paperQueries.detail(Number(params.id)));

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
        <MessageSwiper
          category="cake"
          messages={messages}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
        <DetailAuthorInfo>
          <DetailAuthorInfo.Nickname
            color={
              activeIndex + 1 > 13 && activeIndex + 1 < 27
                ? 'white'
                : 'gray-900'
            }
            nickname={
              currentMessage?.anonymous || currentMessage?.user?.nickname
            }
          />
          <DetailAuthorInfo.PageLength
            currentIndex={activeIndex}
            totalIndex={messages?.length}
          />
        </DetailAuthorInfo>
      </StyledContentWrapper>
      <DetailActionButtons
        category="makecake"
        paperAuthorId={paper?.userId}
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
