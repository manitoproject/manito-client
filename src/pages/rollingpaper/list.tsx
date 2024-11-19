import { useEffect } from 'react';

import DetailHeader from '@/components/rollingpaper/list/header/detail-header';
import MessageList from '@/components/rollingpaper/list/message-list';
import ReactHelmet, { TITLE } from '@/helmet';
import useSetHeader from '@/hooks/use-set-header';
import { ROLLINGPAPER_BG_MAP } from '@/lib/rolling-paper';
import {
  StyledBackdrop,
  StyledListWrapper,
  StyledRollingList,
} from '@/pages/rollingpaper/list.style';
import { usePaperDetailQuery } from '@/queries/paper';
import { useMessageActions } from '@/stores/message-index-store';

export default function RollingpaperList() {
  const { data } = usePaperDetailQuery();
  const paper = data?.data;
  const messageActions = useMessageActions();

  useSetHeader({
    title: paper?.title,
    bg: ROLLINGPAPER_BG_MAP[paper?.theme ?? 'animal'].bgColor,
    color: paper?.theme === 'animal' ? undefined : 'white',
  });
  useEffect(() => {
    return () => messageActions.reset();
  }, [messageActions]);

  return (
    <StyledRollingList>
      <ReactHelmet title={`${paper?.title} - ${TITLE}`} />
      <StyledListWrapper>
        <DetailHeader paperId={paper?.id} content="rollingpaper" />
        <MessageList />
      </StyledListWrapper>
      <StyledBackdrop
        bg={ROLLINGPAPER_BG_MAP[paper?.theme ?? 'animal'].bgUrl}
      />
    </StyledRollingList>
  );
}
