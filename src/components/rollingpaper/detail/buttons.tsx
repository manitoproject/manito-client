import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/common/button/buttons';
import DeleteModal from '@/components/modal/delete-modal';
import { token } from '@/lib/storage';
import { useDeleteMessage } from '@/queries/message';
import { useUserQuery } from '@/queries/users';
import routes from '@/routes';
import theme from '@/styles/theme';
import { Message } from '@/types/message';

interface AuthButtonsProps extends DetailMessageButtonsProps {}
interface DetailMessageButtonsProps {
  message: Message<UserIdAndNickname>;
  authorId?: number;
  category: CategoryLowerCase;
}

function AuthButtons({ message, authorId, category }: AuthButtonsProps) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: userData } = useUserQuery();
  const { mutate } = useDeleteMessage({
    paperId: message?.paperId,
    isDetailPaer: true,
  });
  const user = userData?.data;
  return (
    <>
      {message?.user?.id === user?.id && (
        <Button
          css={{ background: theme.colors['powderBlue-900'] }}
          onClick={() =>
            navigate(routes[category].messageEdit(message?.paperId), {
              state: { id: message.id },
            })
          }
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
          setIsOpen={setIsModalOpen}
          handler={() => mutate(message?.id)}
        />
      )}
    </>
  );
}

export default function DetailPageBottomButtons({
  message,
  authorId,
  category,
}: DetailMessageButtonsProps) {
  const navigate = useNavigate();
  return (
    <StyledDetailMessageButtons>
      <Button
        css={{
          background: theme.colors.white,
          color: theme.colors.black,
          border: `1px solid ${theme.colors['gray-300']}`,
        }}
        onClick={() => navigate(routes[category].list(message.paperId))}
      >
        닫기
      </Button>

      {token.getAccessToken() && (
        <AuthButtons
          category={category}
          message={message}
          authorId={authorId}
        />
      )}
    </StyledDetailMessageButtons>
  );
}

const StyledDetailMessageButtons = styled.div`
  display: flex;
  position: relative;
  z-index: 50;
  gap: 8px;
`;
