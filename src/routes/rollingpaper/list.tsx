import { useEffect } from 'react';

import DetailHeader from '../../components/rollingpaper/list/header/detail-header';
import MessageList from '../../components/rollingpaper/list/message-list';
import ReactHelmet, { TITLE } from '../../helmet';
import { useSetHeader } from '../../hooks';
import { usePaperDetailQuery } from '../../queries/paper';
import { useMessageActions } from '../../stores/message-store';
import { ColorName } from '../../styles/theme';
import {
  StyledBackdrop,
  StyledListWrapper,
  StyledRollingList,
} from './list.style';

export const COLOR_BY_THEME: Record<RollingThemeName, ColorName> = {
  animal: 'white',
  space: 'powderBlue-900',
  nature: 'powderBlue-800',
};

export default function RollingpaperList() {
  const { data } = usePaperDetailQuery();
  const paper = data?.data;
  const messageActions = useMessageActions();
  useSetHeader({
    title: paper?.title,
    bg: COLOR_BY_THEME[paper?.theme ?? 'animal'],
    color: paper?.theme === 'animal' ? undefined : 'white',
  });
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
