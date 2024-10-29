import styled from '@emotion/styled';

import AuthorInfo from '@/components/rollingpaper/detail/author-info';
import DetailMessageButtons from '@/components/rollingpaper/detail/buttons';
import MessageSwipe from '@/components/swipe/message-swipe';
import { ROLLINGPAPER_BG_MAP } from '@/constants/rolling-paper';
import ReactHelmet, { TITLE } from '@/helmet';
import useMessageDetail from '@/hooks/use-message-detail';
import useSetHeader from '@/hooks/use-set-header';
import { usePaperDetailQuery } from '@/queries/paper';
import { StyledBackdrop } from '@/routes/rollingpaper/list.style';

export default function RollingpaperDetail() {
  const { activeIndex, messages, setActiveIndex } = useMessageDetail();
  const { data: paperData } = usePaperDetailQuery();

  const paper = paperData?.data;
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
      <DetailMessageButtons
        category="rollingpaper"
        authorId={paperData?.data?.userId}
        message={currentMessage}
      />
      <ReactHelmet title={`${paperData?.data?.title} - ${TITLE}`} />
      <StyledBackdrop
        bg={ROLLINGPAPER_BG_MAP[paperData?.data?.theme ?? 'animal'].bgUrl}
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
