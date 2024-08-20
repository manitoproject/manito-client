import { useEffect } from 'react';

import Detail from '../../components/rollingpaper/detail/detail';
import MessageScreen from '../../components/rollingpaper/detail/message-screen/screen';
import ReactHelmet, { TITLE } from '../../helmet';
import { usePaperDetailQuery } from '../../queries/paper';
import {
  useMessageScreenActions,
  useMessageScreenVisible,
} from '../../stores/message-screen-store';
import { StyledBackdrop, StyledRollingDetail } from './detail.style';

export default function RollingpaperDetail() {
  const { data } = usePaperDetailQuery();
  const isScreenVisible = useMessageScreenVisible();
  const messageScreen = useMessageScreenActions();

  useEffect(() => {
    return () => {
      if (isScreenVisible) {
        messageScreen.close();
        messageScreen.resetActiveIndex();
      }
    };
  }, [isScreenVisible, messageScreen]);

  return (
    <StyledRollingDetail>
      <ReactHelmet title={`${data?.data?.title} - ${TITLE}`} />
      {isScreenVisible ? (
        <MessageScreen userId={data?.data?.userId} />
      ) : (
        <Detail />
      )}
      <StyledBackdrop themeName={data?.data?.theme} />
    </StyledRollingDetail>
  );
}
