import { EditSquare, Trash } from '../../assets/svg/icons';
import { findEmojiForTheme } from '../../constants/emojis';
import { useDeleteMessage } from '../../queries/message';
import { Message } from '../../types/message';
import EmojiSkin from '../common/emoji-skin';
import {
  StyledEditButton,
  StyledMessageItem,
  StyledTrashButton,
} from '../detail/message-item.style';

interface MyMessageItemProps {
  message: Message;
}

export default function MyMessageItem({ message }: MyMessageItemProps) {
  const { mutate } = useDeleteMessage({
    paperId: message.paperId,
  });

  const EmojiSvg = findEmojiForTheme(message.theme)?.svg;
  console.log(message);
  return (
    <StyledMessageItem isServerData>
      <StyledEditButton type="button" onClick={() => console.log('sdf')}>
        <EditSquare />
      </StyledEditButton>
      <StyledTrashButton type="button" onClick={() => mutate(message.id)}>
        <Trash />
      </StyledTrashButton>
      <EmojiSkin
        isMini
        theme={message.theme}
        fontKey={message.font}
        colorKey={message.fontColor}
      >
        {EmojiSvg && <EmojiSvg />}
        <p>{message.content}</p>
      </EmojiSkin>
    </StyledMessageItem>
  );
}
