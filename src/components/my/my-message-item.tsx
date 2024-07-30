import { EditSquare, Trash } from '../../assets/svg/icons';
import emojis from '../../constants/emojis';
import { fonts } from '../../constants/fonts';
import { useDeleteMessage } from '../../queries/message';
import { Message } from '../../types/message';
import {
  StyledEditButton,
  StyledMessageBox,
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
  const findEmojiForTheme = (name: string) =>
    [...emojis.animal, ...emojis.nature, ...emojis.space].find(
      (item) => item.name === name,
    );
  const Emoji = findEmojiForTheme(message.theme)?.svg;

  return (
    <StyledMessageItem isServerData>
      <StyledEditButton type="button" onClick={() => console.log('sdf')}>
        <EditSquare />
      </StyledEditButton>
      <StyledTrashButton type="button" onClick={() => mutate(message.id)}>
        <Trash />
      </StyledTrashButton>
      {Emoji && <Emoji />}
      <StyledMessageBox
        color={message.fontColor}
        font={fonts.find((font) => font.name === message.font)}
      >
        {message.content}
      </StyledMessageBox>
    </StyledMessageItem>
  );
}
