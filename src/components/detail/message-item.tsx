import { useState } from 'react';

import { AddCircle } from '../../assets/svg/icons';
import emojis from '../../constants/emojis';
import { ThemeName } from '../../constants/theme-list';
import { usePaperDetailQuery } from '../../queries/paper';
import { useUserQuery } from '../../queries/users';
import { Message } from '../../types/message';
import MessageSkin from '../message/message-skin';
import LoginModal from '../modal/login-modal';
import {
  StyledEmptySvg,
  StyledItem,
  StyledMessageItem,
} from './message-item.style';

export interface MessageItemProps {
  onMessageClick: () => void;
  onBottomSheetOpen: (status: boolean) => void;
  message: Message | null | Pick<Message, 'theme'>;
}
export default function MessageItem({
  onMessageClick,
  onBottomSheetOpen,
  message,
}: MessageItemProps) {
  const { data: userData } = useUserQuery();
  const { data: PaperDetailData } = usePaperDetailQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const EmojiSvg = emojis[PaperDetailData?.data?.theme as ThemeName]?.find(
    (item) => item.name === message?.theme,
  )?.svg;

  const isOwner = userData?.data?.id === PaperDetailData?.data?.userId;

  const handleMessageClick = () => {
    if (userData?.data?.id) onMessageClick();
    else setIsModalOpen(true);
  };

  return (
    <>
      {PaperDetailData?.data && message ? (
        'content' in message ? (
          <MessageSkin
            isSmall
            theme={message.theme}
            ColorName={message.fontColor}
            FontName={message.font}
          >
            {EmojiSvg ? <EmojiSvg /> : <StyledEmptySvg />}
            <p>{message.content}</p>
          </MessageSkin>
        ) : (
          <StyledMessageItem
            onClick={() => onBottomSheetOpen(true)}
            isServerData={false}
          >
            {EmojiSvg ? <EmojiSvg /> : <StyledEmptySvg />}
          </StyledMessageItem>
        )
      ) : (
        <StyledItem isOwner={false}>
          {/* <StyledItem isOwner={isOwner}> */}
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
