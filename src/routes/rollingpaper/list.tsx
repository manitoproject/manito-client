import { useEffect } from 'react';

import DetailHeader from '../../components/rollingpaper/list/header/detail-header';
import MessageList from '../../components/rollingpaper/list/message-list';
import ReactHelmet, { TITLE } from '../../helmet';
import { usePaperDetailQuery } from '../../queries/paper';
import { useMessageActions } from '../../stores/message-store';
import {
  StyledBackdrop,
  StyledListWrapper,
  StyledRollingList,
} from './list.style';

export default function RollingpaperList() {
  const { data } = usePaperDetailQuery();
  const paper = data?.data;
  const messageActions = useMessageActions();

  useEffect(() => {
    return () => messageActions.reset();
  }, [messageActions]);

  return (
    <StyledRollingList>
      <ReactHelmet title={`${paper?.title} - ${TITLE}`} />
      <StyledListWrapper>
        <DetailHeader paperId={paper?.id} />
        <MessageList />
      </StyledListWrapper>
      <StyledBackdrop themeName={paper?.theme} />
    </StyledRollingList>
  );
}
