import styled from '@emotion/styled';
import { useState } from 'react';

import { useUserQuery } from '../../../queries/users';
import useToastStore from '../../../stores/toastStore';
import theme from '../../../styles/theme';
import { Message } from '../../../types/message';
import { Button } from '../../common/buttons';
import { Modal } from '../../modal/modal';

interface ItemViewButtonsProps {
  messages?: Message[];
  activeIndex: number;
  onCloseItemView: () => void;
}

export default function ItemViewButtons({
  messages,
  activeIndex,
  onCloseItemView,
}: ItemViewButtonsProps) {
  const { data: userData } = useUserQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToastStore();

  const handleMessageDeletee = () => {
    setIsModalOpen(true);
  };
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
      {messages?.[activeIndex].user?.id === userData?.data?.id && (
        <>
          <Button
            css={{ background: theme.colors['powderBlue-900'] }}
            onClick={onCloseItemView}
          >
            수정
          </Button>
          <Button css={{}} onClick={handleMessageDeletee}>
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
              onClick={() => toast.add('편지가 삭제 되었습니다.')}
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
