import { AddCircle } from '../../assets/svg/icons';
import emojis from '../../constants/emojis';
import { fonts } from '../../constants/fonts';
import { ThemeKey } from '../../constants/theme-list';
import { usePaperDetailQuery } from '../../queries/paper';
import { Message } from '../../types/message';
import {
  StyledEmptySvg,
  StyledItem,
  StyledMessageBox,
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
  const { data: PaperDetailData } = usePaperDetailQuery();

  const EmojiSvg = emojis[PaperDetailData?.data?.theme as ThemeKey]?.find(
    (item) => item.name === message?.theme,
  )?.svg;

  return PaperDetailData?.data && message ? (
    'content' in message ? (
      <StyledMessageItem isServerData>
        {EmojiSvg ? <EmojiSvg /> : <StyledEmptySvg />}
        <StyledMessageBox
          color={message.fontColor}
          font={fonts.find((font) => font.name === message.font)}
        >
          {message.content}
        </StyledMessageBox>
      </StyledMessageItem>
    ) : (
      <StyledMessageItem
        onClick={() => onBottomSheetOpen(true)}
        isServerData={false}
      >
        {EmojiSvg ? <EmojiSvg /> : <StyledEmptySvg />}
      </StyledMessageItem>
    )
  ) : (
    <StyledItem>
      <button type="button" onClick={onMessageClick}>
        <AddCircle />
      </button>
    </StyledItem>
  );
}
