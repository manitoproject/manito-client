import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { EditSquare, Trash } from '../../../assets/svg/icons';
import { findEmojiSvgFromTheme } from '../../../constants/emojis';
import { getRollingThemeName } from '../../../constants/theme-list';
import { useDeleteMessage } from '../../../queries/message';
import routes from '../../../routes';
import { Message } from '../../../types/message';
import DeleteModal from '../../modal/delete-modal';
import EmojiSkin from '../../rollingpaper/emoji-skin';
import {
  StyledEditButton,
  StyledMessageItem,
  StyledTrashButton,
} from '../../rollingpaper/list/item.style';

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

  const handleEditMessage = () => {
    navigate(routes.rollingpaper.form('edit', message.paperId), {
      state: {
        ...message,
        paperTheme: getRollingThemeName(message),
      },
    });
  };

  const handleClick = async () => {
    navigate(routes.rollingpaper.detail(message.paperId), {
      state: message.id,
    });
  };

  return (
    <StyledMessageItem isServerData>
      <StyledEditButton type="button" onClick={handleEditMessage}>
        <EditSquare />
      </StyledEditButton>
      <StyledTrashButton type="button" onClick={() => setIsModalOpen(true)}>
        <Trash />
      </StyledTrashButton>
      <EmojiSkin
        onClick={handleClick}
        paperId={message.paperId}
        isSmall
        message={message}
      >
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
