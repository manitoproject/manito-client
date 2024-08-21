import styled from '@emotion/styled';
import { useEffect } from 'react';

import { useMessageActions } from '../../../../stores/message-store';
import DetailHeader from '../header/detail-header';
import MessageList from './list';

export default function MessageListContainer() {
  const messageActions = useMessageActions();
  useEffect(() => {
    return () => messageActions.reset();
  }, [messageActions]);

  return (
    <StyledWrapper>
      <DetailHeader />
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
