import styled from '@emotion/styled';
import { useEffect } from 'react';

import { useMessageScreenActions } from '../../../stores/message-screen-store';
import { useMessageActions } from '../../../stores/message-store';
import { useToastActions } from '../../../stores/toast-store';
import DetailHeader from './header/detail-header';
import MessageList from './message-list';

export default function Detail() {
  const messageScreen = useMessageScreenActions();
  const messageActions = useMessageActions();
  const toastActions = useToastActions();
  const handleMessageScreenOpen = () => {
    if (messageActions.hasList()) return messageScreen.open();
    toastActions.add('상세보기 내역이 없습니다.');
  };

  useEffect(() => {
    return () => messageActions.reset();
  }, [messageActions]);

  return (
    <StyledWrapper>
      <DetailHeader onMessageScreenOpen={handleMessageScreenOpen} />
      <MessageList />
    </StyledWrapper>
  );
}

export const StyledWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 28px;
  z-index: 50;
`;
