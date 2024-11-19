import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';

import { AddCircle } from '@/assets/svg/icons';
import LoginModal from '@/components/modal/login-modal';
import EmojiSkin from '@/components/rollingpaper/emoji-skin';
import {
  StyledEmptySvg,
  StyledItem,
} from '@/components/rollingpaper/list/item.style';
import { paperQueries, userQueries } from '@/lib/query-factory';
import { ROLLINGPAPER_EMOJI_MAP } from '@/lib/rolling-paper';
import routes from '@/routes';
import { Message } from '@/types/message';

export interface MessageItemProps {
  message: Message<unknown> | null;
  position: number;
}

export default function MessageItem({ message, position }: MessageItemProps) {
  const navigate = useNavigate();
  const params = useParams();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { data: paper } = useQuery(paperQueries.detail(Number(params.id)));
  const { data: user } = useQuery(userQueries.detail());
  const EmojiSvg = ROLLINGPAPER_EMOJI_MAP[
    paper?.theme as RollingThemeName
  ]?.find((item) => item.name === message?.theme)?.svg;

  const handleCreateMessage = () => {
    if (user) {
      navigate(`${routes.rollingpaper.messageCreate(paper?.id)}`, {
        state: { position },
      });
    } else {
      setIsLoginModalOpen(true);
    }
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
      {paper && message ? (
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
      {isLoginModalOpen && (
        <LoginModal
          onToggleModal={() => setIsLoginModalOpen((prev) => !prev)}
        />
      )}
    </>
  );
}
