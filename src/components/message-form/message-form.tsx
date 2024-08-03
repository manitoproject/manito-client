import { findEmojiSvgFromTheme } from '../../constants/emojis';
import { StyledRollingNewWrapper } from '../../routes/rolling-new.style';
import { ColorName, FontNameWithoutAppleFont } from '../../styles/theme';
import { Button } from '../common/buttons';
import EmojiSkin from '../common/emoji-skin';
import { StyledEmptySvg } from '../detail/message-item.style';
import MessageFormBottomSheet from './message-form-bottom-sheet';

interface MessageFormProps {
  emoji: string;
  color: ColorName;
  setColor: React.Dispatch<React.SetStateAction<ColorName>>;
  font: FontNameWithoutAppleFont;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setFont: React.Dispatch<React.SetStateAction<FontNameWithoutAppleFont>>;
  handleSubmit: () => void;
}

export default function MessageForm({
  color,
  font,
  emoji,
  content,
  setColor,
  setFont,
  handleSubmit,
  setContent,
}: MessageFormProps) {
  const theme = findEmojiSvgFromTheme(emoji);
  return (
    <StyledRollingNewWrapper>
      <EmojiSkin emoji={emoji} color={color} fontName={font}>
        {theme ? <theme.svg /> : <StyledEmptySvg />}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </EmojiSkin>
      <MessageFormBottomSheet
        activeColor={color}
        activeFont={font}
        setActiveColor={setColor}
        setActiveFont={setFont}
      >
        <Button onClick={handleSubmit} disabled={!content.length}>
          작성완료
        </Button>
      </MessageFormBottomSheet>
    </StyledRollingNewWrapper>
  );
}
