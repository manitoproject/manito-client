import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getRollingThemeName } from '../../../constants/theme-list';
import { useDeleteMessage } from '../../../queries/message';
import { useUserQuery } from '../../../queries/users';
import { routes } from '../../../router';
import theme from '../../../styles/theme';
import { Message } from '../../../types/message';
import { Button } from '../../common/button/buttons';
import DeleteModal from '../../modal/delete-modal';

interface ItemViewButtonsProps {
  message: Message<UserIdAndNickname>;
  onCloseItemView: () => void;
  userId?: number;
}

export default function ItemViewButtons({
  message,
  onCloseItemView,
  userId,
}: ItemViewButtonsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { data: userData } = useUserQuery();
  const { mutate } = useDeleteMessage({
    paperId: message.paperId,
    closeModal: () => onCloseItemView(),
  });
  const user = userData?.data;

  return (
    <StyledItemViewButtons>
      <Button
        css={{
          background: theme.colors.white,
          color: theme.colors.black,
          outline: `1px solid ${theme.colors['gray-300']}`,
        }}
        onClick={onCloseItemView}
      >
        닫기
      </Button>
      {message.user?.id === user?.id && (
        <Button
          css={{ background: theme.colors['powderBlue-900'] }}
          onClick={() => {
            navigate(routes.rolling.messageEdit(), {
              state: {
                ...message,
                rollingThemeName: getRollingThemeName(message),
              },
            });
          }}
        >
          수정
        </Button>
      )}
      {(message.user?.id === user?.id || user?.id === userId) && (
        <Button css={{}} onClick={() => setIsModalOpen(true)}>
          삭제
        </Button>
      )}
      {isModalOpen && (
        <DeleteModal
          isMessageDelete
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          handler={() => mutate(message.id)}
        />
      )}
    </StyledItemViewButtons>
  );
}

const StyledItemViewButtons = styled.div`
  display: flex;
  gap: 8px;
`;
