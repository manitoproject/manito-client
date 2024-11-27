import { useQuery } from '@tanstack/react-query';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';

import { AddCircle } from '@/assets/svg/icons';
import RollingpaperEmojiSkin from '@/components/rollingpaper/emoji-skin';
import {
  StyledEmptySvg,
  StyledItem,
} from '@/components/rollingpaper/list/item.style';
import { paperQueries, userQueries } from '@/lib/query-factory';
import { ROLLINGPAPER_EMOJI_MAP } from '@/lib/rolling-paper';
import routes from '@/routes';
import { useLoginModalActions } from '@/stores/login-modal-store';
import { Message } from '@/types/message';

interface RollingpaperMessageItemProps {
  message: Message<unknown> | null;
  position: number;
}

export default function RollingpaperMessageItem({
  message,
  position,
}: RollingpaperMessageItemProps) {
  const navigate = useNavigate();
  const loginModal = useLoginModalActions();
  const params = useParams();
  const { data: paper } = useQuery(paperQueries.detail(Number(params.id)));
  const { data: user } = useQuery(userQueries.detail());
  const EmojiSvg = ROLLINGPAPER_EMOJI_MAP[
    paper?.theme as RollingpaperThemeName
  ]?.find((item) => item.name === message?.theme)?.svg;

  const handleCreateMessage = () => {
    if (user) {
      navigate(`${routes.rollingpaper.messageCreate(paper?.id)}`, {
        state: { position },
      });
    } else {
      loginModal.toggleOpen(true);
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
        <RollingpaperEmojiSkin
          onClick={() => handleViewMessageItem(message.paperId, message.id)}
          isSmall
          message={message}
        >
          {EmojiSvg ? <EmojiSvg /> : <StyledEmptySvg />}
          <p>{message.content}</p>
        </RollingpaperEmojiSkin>
      ) : (
        <StyledItem isOwner={false}>
          <button type="button" onClick={handleCreateMessage}>
            <AddCircle />
          </button>
        </StyledItem>
      )}
    </>
  );
}
