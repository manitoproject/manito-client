import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import routes from '../../../../constants/routes';
import { getRollingThemeName } from '../../../../constants/theme-list';
import { useDeleteMessage } from '../../../../queries/message';
import { useUserQuery } from '../../../../queries/users';
import { useMessageScreenActions } from '../../../../stores/message-screen-store';
import theme from '../../../../styles/theme';
import { Message } from '../../../../types/message';
import { Button } from '../../../common/button/buttons';
import DeleteModal from '../../../modal/delete-modal';

interface MessageScreenButtonsProps {
  message: Message<UserIdAndNickname>;
  authorId?: number;
}

export default function MessageScreenButtons({
  message,
  authorId,
}: MessageScreenButtonsProps) {
  const messageScreenActions = useMessageScreenActions();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: userData } = useUserQuery();
  const { mutate } = useDeleteMessage({
    paperId: message?.paperId,
    closeModal: () => messageScreenActions.close(),
  });
  const user = userData?.data;

  return (
    <StyledMessageScreenButtons>
      <Button
        css={{
          background: theme.colors.white,
          color: theme.colors.black,
          outline: `1px solid ${theme.colors['gray-300']}`,
        }}
        onClick={messageScreenActions.close}
      >
        닫기
      </Button>
      {message?.user?.id === user?.id && (
        <Button
          css={{ background: theme.colors['powderBlue-900'] }}
          onClick={() => {
            navigate(routes.rollingpaper.form('edit', message?.paperId), {
              state: {
                ...message,
                paperTheme: getRollingThemeName(message),
              },
            });
          }}
        >
          수정
        </Button>
      )}
      {(message?.user?.id === user?.id || user?.id === authorId) && (
        <Button css={{}} onClick={() => setIsModalOpen(true)}>
          삭제
        </Button>
      )}
      {isModalOpen && (
        <DeleteModal
          isMessageDelete
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          handler={() => mutate(message?.id)}
        />
      )}
    </StyledMessageScreenButtons>
  );
}

const StyledMessageScreenButtons = styled.div`
  display: flex;
  gap: 8px;
`;
