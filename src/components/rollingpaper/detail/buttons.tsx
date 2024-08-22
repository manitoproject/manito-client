import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getRollingThemeName } from '../../../constants/theme-list';
import { useDeleteMessage } from '../../../queries/message';
import { useUserQuery } from '../../../queries/users';
import routes from '../../../routes';
import theme from '../../../styles/theme';
import { Message } from '../../../types/message';
import { token } from '../../../utils/storage';
import { Button } from '../../common/button/buttons';
import DeleteModal from '../../modal/delete-modal';

interface AuthButtonsProps extends DetailMessageButtonsProps {}
interface DetailMessageButtonsProps {
  message: Message<UserIdAndNickname>;
  authorId?: number;
}

function AuthButtons({ message, authorId }: AuthButtonsProps) {
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
    </>
  );
}

export default function DetailMessageButtons({
  message,
  authorId,
}: DetailMessageButtonsProps) {
  const navigate = useNavigate();
  return (
    <StyledDetailMessageButtons>
      {!token.getAccessToken() ? (
        <Button
          css={{
            background: theme.colors.white,
            color: theme.colors.black,
            border: `1px solid ${theme.colors['gray-300']}`,
          }}
          onClick={() => navigate(routes.rollingpaper.list(message.paperId))}
        >
          닫기
        </Button>
      ) : (
        <AuthButtons message={message} authorId={authorId} />
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
