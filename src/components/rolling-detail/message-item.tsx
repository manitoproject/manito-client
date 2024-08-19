import { useState } from 'react';

import { AddCircle } from '../../assets/svg/icons';
import emojis from '../../constants/emojis';
import { usePaperDetailQuery } from '../../queries/paper';
import { useUserQuery } from '../../queries/users';
import { Message } from '../../types/message';
import EmojiSkin from '../common/emoji-skin';
import LoginModal from '../modal/login-modal';
import { StyledEmptySvg, StyledItem } from './message-item.style';

export interface MessageItemProps {
  onMessageClick: () => void;
  message: Message<unknown> | null;
}
export default function MessageItem({
  onMessageClick,
  message,
}: MessageItemProps) {
  const { data: userData } = useUserQuery();
  const { data: PaperDetailData } = usePaperDetailQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const EmojiSvg = emojis[
    PaperDetailData?.data?.theme as RollingThemeName
  ]?.find((item) => item.name === message?.theme)?.svg;

  const isOwner = userData?.data?.id === PaperDetailData?.data?.userId;

  const handleMessageClick = () => {
    if (userData?.data?.id) onMessageClick();
    else setIsModalOpen(true);
  };

  return (
    <>
      {PaperDetailData?.data && message ? (
        <EmojiSkin isSmall message={message}>
          {EmojiSvg ? <EmojiSvg /> : <StyledEmptySvg />}
          <p>{message.content}</p>
        </EmojiSkin>
      ) : (
        <StyledItem isOwner={false}>
          <button type="button" onClick={handleMessageClick}>
            {!isOwner && <AddCircle />}
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
