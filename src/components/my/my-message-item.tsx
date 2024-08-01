import { useNavigate } from 'react-router-dom';

import { EditSquare, Trash } from '../../assets/svg/icons';
import { getEmojiObjectByName } from '../../constants/emojis';
import { useDeleteMessage } from '../../queries/message';
import { routes } from '../../router';
import { Message } from '../../types/message';
import {
  StyledEditButton,
  StyledMessageItem,
  StyledTrashButton,
} from '../detail/message-item.style';
import MessageSkin from '../message/message-skin';

interface MyMessageItemProps {
  message: Message;
}

export default function MyMessageItem({ message }: MyMessageItemProps) {
  const navigate = useNavigate();
  const { mutate } = useDeleteMessage({
    paperId: message.paperId,
  });

  const EmojiSvg = getEmojiObjectByName(message.theme)?.svg;
  return (
    <StyledMessageItem isServerData>
      <StyledEditButton
        type="button"
        onClick={() =>
          navigate(routes.rolling.messageEdit(), { state: message })
        }
      >
        <EditSquare />
      </StyledEditButton>
      <StyledTrashButton type="button" onClick={() => mutate(message.id)}>
        <Trash />
      </StyledTrashButton>
      <MessageSkin
        isSmall
        theme={message.theme}
        FontName={message.font}
        ColorName={message.fontColor}
      >
        {EmojiSvg && <EmojiSvg />}
        <p>{message.content}</p>
      </MessageSkin>
    </StyledMessageItem>
  );
}
