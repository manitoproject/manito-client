import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AddCircle } from '../../../assets/svg/icons';
import emojis from '../../../constants/emojis';
import { usePaperDetailQuery } from '../../../queries/paper';
import { useUserQuery } from '../../../queries/users';
import routes from '../../../routes';
import { Message } from '../../../types/message';
import LoginModal from '../../modal/login-modal';
import EmojiSkin from '../emoji-skin';
import { StyledEmptySvg, StyledItem } from './item.style';

export interface MessageItemProps {
  message: Message<unknown> | null;
  position: number;
}

export default function MessageItem({ message, position }: MessageItemProps) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: userData } = useUserQuery();
  const { data: PaperDetailData } = usePaperDetailQuery();
  const paper = PaperDetailData?.data;
  const EmojiSvg = emojis[paper?.theme as RollingThemeName]?.find(
    (item) => item.name === message?.theme,
  )?.svg;

  const handleCreateMessage = () => {
    const isLoggedIn = userData?.data?.id;
    if (isLoggedIn) {
      return navigate(`${routes.rollingpaper.form('create', paper?.id)}`, {
        state: { paperTheme: paper?.theme, position },
      });
    }
    return setIsModalOpen(true);
  };

  const handleClick = async () => {
    navigate(routes.rollingpaper.detail(message?.paperId), {
      state: message?.id,
    });
  };

  return (
    <>
      {PaperDetailData?.data && message ? (
        <EmojiSkin onClick={handleClick} isSmall message={message}>
          {EmojiSvg ? <EmojiSvg /> : <StyledEmptySvg />}
          <p>{message.content}</p>
        </EmojiSkin>
      ) : (
        <StyledItem isOwner={false}>
          <button type="button" onClick={handleCreateMessage}>
            <AddCircle />
            {/* {!isOwner && <AddCircle />} */}
          </button>
        </StyledItem>
      )}
      {isModalOpen && (
        <LoginModal
          isOpen={isModalOpen}
          onToggleModal={() => setIsModalOpen((prev) => !prev)}
        />
      )}
    </>
  );
}
