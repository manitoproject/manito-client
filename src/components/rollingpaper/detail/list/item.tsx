import { useState } from 'react';

import { AddCircle } from '../../../../assets/svg/icons';
import emojis from '../../../../constants/emojis';
import { usePaperDetailQuery } from '../../../../queries/paper';
import { useUserQuery } from '../../../../queries/users';
import { Message } from '../../../../types/message';
import LoginModal from '../../../modal/login-modal';
import EmojiSkin from '../../emoji-skin';
import { StyledEmptySvg, StyledItem } from './item.style';

export interface MessageItemProps {
  onEmptyMessageClick: () => void;
  message: Message<unknown> | null;
}
export default function MessageItem({
  onEmptyMessageClick,
  message,
}: MessageItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: userData } = useUserQuery();
  const { data: PaperDetailData } = usePaperDetailQuery();
  const EmojiSvg = emojis[
    PaperDetailData?.data?.theme as RollingThemeName
  ]?.find((item) => item.name === message?.theme)?.svg;

  // const isOwner = userData?.data?.id === PaperDetailData?.data?.userId;

  const handleEmptyMessageClick = () => {
    if (userData?.data?.id) onEmptyMessageClick();
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
          <button type="button" onClick={handleEmptyMessageClick}>
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
