import styled from '@emotion/styled';

import AuthorInfo from '@/components/rollingpaper/detail/author-info';
import DetailPageBottomButtons from '@/components/rollingpaper/detail/buttons';
import MessageSwipe from '@/components/swipe/message-swipe';
import ReactHelmet, { TITLE } from '@/helmet';
import useMessageDetail from '@/hooks/use-message-detail';
import useSetHeader from '@/hooks/use-set-header';
import { CAKE_THEME_PALETTES } from '@/lib/cake-decoration';
import { StyledBackdrop } from '@/pages/rollingpaper/list.style';
import { usePaperDetailQuery } from '@/queries/paper';
import { StyledContentOverlay } from '@/styles/styled';

export default function CakeDetail() {
  const { activeIndex, messages, setActiveIndex } = useMessageDetail();
  const { data: paperData } = usePaperDetailQuery();
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
        authorId={paperData?.data?.userId}
        message={currentMessage}
      />
      <ReactHelmet title={`${paperData?.data?.title} - ${TITLE}`} />
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
