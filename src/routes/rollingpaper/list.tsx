import { useEffect } from 'react';

import {
  AnimalBgOriginal,
  NatureBgOriginal,
  SpaceBgOriginal,
} from '../../assets/imgs';
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

export const BG_BY_THEME: Record<
  RollingThemeName,
  { bgColor: ColorName; bgUrl: string }
> = {
  animal: { bgColor: 'white', bgUrl: AnimalBgOriginal },
  space: { bgColor: 'powderBlue-900', bgUrl: SpaceBgOriginal },
  nature: { bgColor: 'powderBlue-800', bgUrl: NatureBgOriginal },
};

export default function RollingpaperList() {
  const { data } = usePaperDetailQuery();
  const paper = data?.data;
  const messageActions = useMessageActions();
  useSetHeader({
    title: paper?.title,
    bg: BG_BY_THEME[paper?.theme ?? 'animal'].bgColor,
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
      <StyledBackdrop bg={BG_BY_THEME[paper?.theme ?? 'animal'].bgUrl} />
    </StyledRollingList>
  );
}
