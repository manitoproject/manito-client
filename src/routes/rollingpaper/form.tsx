import { useState } from 'react';

import { Button } from '../../components/common/button/buttons';
import MessageCreateModal from '../../components/modal/message-create-modal';
import BottomSheet from '../../components/rollingpaper/bottom-sheet/bottom-sheet';
import { StyledBottomSheetContentWrapper } from '../../components/rollingpaper/bottom-sheet/bottom-sheet.style';
import EmojiSheet from '../../components/rollingpaper/bottom-sheet/emoji-sheet/emoji-sheet';
import ColorList from '../../components/rollingpaper/bottom-sheet/font-sheet/color-list';
import FontList from '../../components/rollingpaper/bottom-sheet/font-sheet/font-list';
import FontSheet from '../../components/rollingpaper/bottom-sheet/font-sheet/font-sheet';
import EmojiSkin from '../../components/rollingpaper/emoji-skin';
import { findEmojiSvgFromTheme } from '../../constants/emojis';
import { useMessageInfo } from '../../hooks';
import { useEditMessage } from '../../queries/message';
import { ColorName, FontNameWithoutAppleFont } from '../../styles/theme';
import {
  StyledOverlayBackdrop,
  StyledRollingNew,
  StyledRollingNewWrapper,
} from './form.style';

export default function RollingpaperEditForm() {
  const messageInfo = useMessageInfo();
  const isEditing = 'font' in messageInfo && messageInfo.type === 'edit';
  const [isEmojiSheetOpen, setIsEmojiSheetOpen] = useState(!isEditing);
  const [isFontSheetOpen, setIsFontSheetOpen] = useState(isEditing);
  const [activeEmoji, setActiveEmoji] = useState(
    isEditing ? messageInfo.theme : '',
  );
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const emoji = findEmojiSvgFromTheme(activeEmoji);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFont, setActiveFont] = useState<FontNameWithoutAppleFont>(
    isEditing ? messageInfo.font : 'Cafe24Ssurround',
  );
  const [activeColor, setActiveColor] = useState<ColorName>(
    isEditing ? messageInfo.fontColor : 'white',
  );
  const [content, setContent] = useState(isEditing ? messageInfo.content : '');

  const handleNextSheet = () => {
    setIsEmojiSheetOpen(false);
    setIsFontSheetOpen(true);
  };
  console.log(messageInfo);
  const { mutate } = useEditMessage(messageInfo.paperId);
  const handleMessageSubmit = () => {
    if (isEditing) {
      mutate({
        content,
        font: activeFont,
        fontColor: activeColor,
        id: messageInfo.id,
      });
    }
    setIsModalOpen(true);
  };
  return (
    <StyledRollingNew>
      <StyledOverlayBackdrop themeName={messageInfo.paperTheme} />
      <StyledRollingNewWrapper>
        <EmojiSkin
          message={{
            font: activeFont,
            fontColor: activeColor,
            theme: emoji?.name,
          }}
        >
          {emoji && <emoji.svg />}
          {isFontSheetOpen && (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          )}
        </EmojiSkin>
      </StyledRollingNewWrapper>
      {isFontSheetOpen && (
        <BottomSheet
          onToggle={() => setIsBottomSheetOpen((prev) => !prev)}
          isOpen={isBottomSheetOpen}
        >
          <StyledBottomSheetContentWrapper>
            <FontSheet
              activeMenuIndex={activeMenuIndex}
              setActiveMenuIndex={setActiveMenuIndex}
            >
              {activeMenuIndex === 0 ? (
                <FontList
                  activeFont={activeFont}
                  setActiveFont={setActiveFont}
                />
              ) : (
                <ColorList
                  theme={messageInfo.paperTheme}
                  activeColor={activeColor}
                  setActiveColor={setActiveColor}
                />
              )}
            </FontSheet>
            <Button onClick={handleMessageSubmit} disabled={!content.length}>
              작성완료
            </Button>
          </StyledBottomSheetContentWrapper>
        </BottomSheet>
      )}
      {isEmojiSheetOpen && (
        <BottomSheet
          isDetailPage
          onToggle={() => setIsEmojiSheetOpen((prev) => !prev)}
          isOpen={isEmojiSheetOpen}
        >
          <StyledBottomSheetContentWrapper>
            <EmojiSheet
              activeEmoji={activeEmoji}
              setActiveEmoji={setActiveEmoji}
              theme={messageInfo.paperTheme}
            />
            <Button onClick={handleNextSheet} disabled={!activeEmoji}>
              편지 선택하기
            </Button>
          </StyledBottomSheetContentWrapper>
        </BottomSheet>
      )}
      {isModalOpen && (
        <MessageCreateModal
          color={activeColor}
          font={activeFont}
          isOpen={isModalOpen}
          content={content}
          setIsOpen={setIsModalOpen}
          messageInfo={{
            emoji: activeEmoji,
            paperId: messageInfo.paperId,
            position: messageInfo.position,
          }}
        />
      )}
    </StyledRollingNew>
  );
}
