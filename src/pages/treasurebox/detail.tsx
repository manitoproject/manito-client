import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { TreasureStartBg } from '@/assets/imgs';
import DetailActionButtons from '@/components/detail/action-buttons';
import DetailAuthorInfo from '@/components/detail/author-info';
import MessageSwiper from '@/components/swiper/message-swiper';
import ReactHelmet from '@/helmet';
import useDetailIndex from '@/hooks/use-detail-index';
import useSetHeader from '@/hooks/use-set-header';
import { messageQueries, paperQueries } from '@/lib/query-factory';
import { StyledBackdrop } from '@/pages/rollingpaper/list.style';
import { StyledContentOverlay } from '@/styles/styled';

export default function TreasureBoxDetail() {
  const params = useParams();
  const { data: messages } = useQuery(messageQueries.paper(Number(params?.id)));
  const { data: paper } = useQuery(paperQueries.detail(Number(params.id)));
  const { activeIndex, setActiveIndex } = useDetailIndex(messages);

  useSetHeader({
    title: '상세보기',
    bg: 'treasure-teal-700',
    color: 'white',
    font: 'Cafe24Ohsquare',
    rightBtn: false,
  });

  if (!messages?.length) return null;
  const currentMessage = messages[activeIndex];
  return (
    <StyledMessageCreateWrapper>
      <StyledContentOverlay opacity={40} />
      <StyledContentWrapper>
        <MessageSwiper
          setActiveIndex={setActiveIndex}
          messages={messages}
          category="treasure"
          activeIndex={activeIndex}
        />
        <DetailAuthorInfo>
          <DetailAuthorInfo.Nickname
            color="white"
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
        category="treasurebox"
        paperAuthorId={paper?.userId}
        message={currentMessage}
      />
      <StyledBackdrop bg={TreasureStartBg} />
      <ReactHelmet title={`${paper?.title} - 마니또`} />
    </StyledMessageCreateWrapper>
  );
}

const StyledMessageCreateWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  z-index: 50;
  flex-direction: column;
`;
const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  gap: 12px;
  position: relative;
  margin-bottom: 58px;
`;
