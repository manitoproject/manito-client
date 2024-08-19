import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import routes from '../../../constants/routes';
import { usePaperMessagesQuery } from '../../../queries/message';
import { usePaperDetailQuery } from '../../../queries/paper';
import {
  useMessageActions,
  useMessageList,
} from '../../../stores/message-store';
import MessageItem from './message-item';

export default function MessageList() {
  const { data: paperData } = usePaperDetailQuery();
  const { data } = usePaperMessagesQuery(paperData?.data?.id);
  const messageList = useMessageList();
  const messageActions = useMessageActions();
  const navigate = useNavigate();

  const handleEmptyMessageClick = (i: number) => {
    navigate(`${routes.rollingpaper.form('create', paperData?.data?.id)}`, {
      state: { paperTheme: paperData?.data?.theme, position: i },
    });
  };

  useEffect(() => {
    messageActions.snycList(data?.data);
  }, [data, messageActions]);

  return (
    <StyledList>
      {messageList.map((message, i) => (
        <MessageItem
          key={i}
          message={message}
          onEmptyMessageClick={() => handleEmptyMessageClick(i)}
        />
      ))}
    </StyledList>
  );
}

export const StyledList = styled.ul`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);
`;
