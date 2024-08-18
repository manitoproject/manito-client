import { useEffect } from 'react';

import Detail from '../components/rolling-detail/detail';
import MessageScreen from '../components/rolling-detail/message-screen/screen';
import ReactHelmet, { TITLE } from '../helmet';
import { usePaperDetailQuery } from '../queries/paper';
import {
  useMessageScreenActions,
  useMessageScreenVisible,
} from '../stores/message-screen-store';
import { StyledBackdrop, StyledRollingDetail } from './rolling-detail.style';

export default function RollingDetail() {
  const { data, isFetching } = usePaperDetailQuery();
  const isScreenVisible = useMessageScreenVisible();
  const messageScreen = useMessageScreenActions();

  const currentPaperId = data?.data?.id;

  useEffect(() => {
    return () => {
      if (isScreenVisible) {
        messageScreen.close();
        messageScreen.resetActiveIndex();
      }
    };
  }, [isScreenVisible, messageScreen]);

  if (isFetching) return <div>로딩중</div>;

  return (
    <StyledRollingDetail>
      <ReactHelmet title={`${data?.data?.title} - ${TITLE}`} />
      {isScreenVisible ? (
        <MessageScreen userId={data?.data?.userId} paperId={currentPaperId} />
      ) : (
        <Detail />
      )}
      <StyledBackdrop themeName={data?.data?.theme} />
    </StyledRollingDetail>
  );
}
