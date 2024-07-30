import { MenuDotsSquare, Trash } from '../../assets/svg/icons';
import emojis from '../../constants/emojis';
import { fonts } from '../../constants/fonts';
import { useUserMessagesQuery } from '../../queries/message';
import {
  StyledDotsButton,
  StyledMessageBox,
  StyledMessageItem,
  StyledTrashButton,
} from '../detail/message-item.style';
import { StyledList } from '../detail/message-list';

export default function MyMessageList() {
  const { data } = useUserMessagesQuery();
  // const { mutate } = useDeleteMessage({
  //   paperId: PaperDetailData?.data?.id,
  //   meesageId: id,
  // });
  const handleMessageDelete = (id?: number) => {
    console.log('sdfsdfs');
    // if (id) mutate(id);
  };
  const findEmojiForTheme = (name: string) =>
    [...emojis.animal, ...emojis.nature, ...emojis.space].find(
      (item) => item.name === name,
    );

  return (
    <StyledList>
      {data?.data?.map((message) => {
        const Emoji = findEmojiForTheme(message.theme)?.svg;
        return (
          <StyledMessageItem key={message.id} isServerData>
            <StyledDotsButton type="button" onClick={() => console.log('sdf')}>
              <MenuDotsSquare />
            </StyledDotsButton>
            <StyledTrashButton
              type="button"
              onClick={() => handleMessageDelete(message.id)}
            >
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
      })}
    </StyledList>
  );
}
