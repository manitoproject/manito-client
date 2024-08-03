import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getRollingThemeName } from '../../../constants/theme-list';
import { useDeleteMessage } from '../../../queries/message';
import { useUserQuery } from '../../../queries/users';
import { routes } from '../../../router';
import theme from '../../../styles/theme';
import { Message } from '../../../types/message';
import { Button } from '../../common/buttons';
import { Modal } from '../../modal/modal';

interface ItemViewButtonsProps {
  message: Message;
  onCloseItemView: () => void;
}

export default function ItemViewButtons({
  message,
  onCloseItemView,
}: ItemViewButtonsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { data: userData } = useUserQuery();
  const { mutate } = useDeleteMessage({
    paperId: message.paperId,
    closeModal: () => setIsModalOpen(false),
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
        <>
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
          <Button css={{}} onClick={() => setIsModalOpen(true)}>
            삭제
          </Button>
        </>
      )}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClick={() => setIsModalOpen((prev) => !prev)}
        >
          <Modal.TitleWrapper>
            <Modal.Title>작성된 펀지를 삭제하시겠습니까?</Modal.Title>
            <Modal.Description>
              삭제한 펀지는 되돌릴 수 없습니다.
            </Modal.Description>
          </Modal.TitleWrapper>
          <Modal.Buttons>
            <Modal.Button
              css={{ border: `1px solid ${theme.colors['gray-300']}` }}
              onClick={() => setIsModalOpen(false)}
            >
              닫기
            </Modal.Button>
            <Modal.Button
              css={{
                background: theme.colors['black'],
                color: theme.colors.white,
              }}
              onClick={() => mutate(message.id)}
            >
              삭제하기
            </Modal.Button>
          </Modal.Buttons>
        </Modal>
      )}
    </StyledItemViewButtons>
  );
}

const StyledItemViewButtons = styled.div`
  display: flex;
  gap: 8px;
`;
