import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { AddCircle } from '@/assets/svg/icons';
import LoginModal from '@/components/modal/login-modal';
import EmojiSkin from '@/components/rollingpaper/emoji-skin';
import {
  StyledEmptySvg,
  StyledItem,
} from '@/components/rollingpaper/list/item.style';
import { ROLLINGPAPER_EMOJI_MAP } from '@/constants/rolling-paper';
import { usePaperDetailQuery } from '@/queries/paper';
import routes from '@/routes';
import { Message } from '@/types/message';
import { token } from '@/utils/storage';

export interface MessageItemProps {
  message: Message<unknown> | null;
  position: number;
}

export default function MessageItem({ message, position }: MessageItemProps) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: PaperDetailData } = usePaperDetailQuery();
  const paper = PaperDetailData?.data;
  const EmojiSvg = ROLLINGPAPER_EMOJI_MAP[
    paper?.theme as RollingThemeName
  ]?.find((item) => item.name === message?.theme)?.svg;

  const handleCreateMessage = () => {
    if (token.getAccessToken()) {
      return navigate(`${routes.rollingpaper.form('create', paper?.id)}`, {
        state: { paperTheme: paper?.theme, position },
      });
    }
    return setIsModalOpen(true);
  };

  const handleViewMessageItem = async (paperId: number, messageId: number) => {
    navigate({
      pathname: routes.rollingpaper.detail(paperId),
      search: createSearchParams({
        id: String(messageId),
      }).toString(),
    });
  };

  return (
    <>
      {PaperDetailData?.data && message ? (
        <EmojiSkin
          onClick={() => handleViewMessageItem(message.paperId, message.id)}
          isSmall
          message={message}
        >
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
