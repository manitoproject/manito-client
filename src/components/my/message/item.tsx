import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { EditSquare, Trash } from '../../../assets/svg/icons';
import { findEmojiSvgFromTheme } from '../../../constants/emojis';
import routes from '../../../constants/routes';
import { getRollingThemeName } from '../../../constants/theme-list';
import { useDeleteMessage } from '../../../queries/message';
import { Message } from '../../../types/message';
import DeleteModal from '../../modal/delete-modal';
import {
  StyledEditButton,
  StyledMessageItem,
  StyledTrashButton,
} from '../../rollingpaper/detail/message-item.style';
import EmojiSkin from '../../rollingpaper/emoji-skin';

interface MyMessageItemProps {
  message: Message<User>;
}
export default function MyMessageItem({ message }: MyMessageItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate } = useDeleteMessage({
    paperId: message.paperId,
  });
  const navigate = useNavigate();
  const EmojiSvg = findEmojiSvgFromTheme(message.theme)?.svg;

  return (
    <StyledMessageItem isServerData>
      <StyledEditButton
        type="button"
        onClick={() =>
          navigate(routes.rollingpaper.form('edit', message.paperId), {
            state: {
              ...message,
              paperTheme: getRollingThemeName(message),
            },
          })
        }
      >
        <EditSquare />
      </StyledEditButton>
      <StyledTrashButton type="button" onClick={() => setIsModalOpen(true)}>
        <Trash />
      </StyledTrashButton>
      <EmojiSkin paperId={message.paperId} isSmall message={message}>
        {EmojiSvg && <EmojiSvg />}
        <p>{message.content}</p>
      </EmojiSkin>
      {isModalOpen && (
        <DeleteModal
          isMessageDelete
          setIsOpen={setIsModalOpen}
          isOpen={isModalOpen}
          handler={() => mutate(message.id)}
        />
      )}
    </StyledMessageItem>
  );
}
