import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import DetailHeader from '@/components/rollingpaper/list/header/detail-header';
import MessageList from '@/components/rollingpaper/list/message-list';
import ReactHelmet, { TITLE } from '@/helmet';
import useSetHeader from '@/hooks/use-set-header';
import { paperQueries } from '@/lib/query-factory';
import { ROLLINGPAPER_BG_MAP } from '@/lib/rolling-paper';
import {
  StyledBackdrop,
  StyledListWrapper,
  StyledRollingList,
} from '@/pages/rollingpaper/list.style';
import { useMessageActions } from '@/stores/message-index-store';

export default function RollingpaperList() {
  const params = useParams();
  const { data: paper } = useQuery(paperQueries.detail(Number(params.id)));
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
        <DetailHeader paper={paper} content="rollingpaper" />
        <MessageList />
      </StyledListWrapper>
      <StyledBackdrop
        bg={ROLLINGPAPER_BG_MAP[paper?.theme ?? 'animal'].bgUrl}
      />
    </StyledRollingList>
  );
}
