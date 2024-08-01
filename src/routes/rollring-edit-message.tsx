import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import BottomSheet from '../components/bottom-sheet/bottom-sheet';
import { StyledBottomSheetContentWrapper } from '../components/bottom-sheet/bottom-sheet.style';
import ColorList from '../components/bottom-sheet/font-sheet/color-list';
import FontList from '../components/bottom-sheet/font-sheet/font-list';
import FontSelectorSheet from '../components/bottom-sheet/font-sheet/font-selector-sheet';
import { Button } from '../components/common/buttons';
import MessageSkin from '../components/message/message-skin';
import { Modal } from '../components/modal/modal';
import { Message } from '../types/message';
import {
  StyledOverlayBackdrop,
  StyledRollingNew,
  StyledRollingNewWrapper,
} from './rolling-new.style';

export default function RollringEditMessage() {
  const location = useLocation();
  const message: Message = location.state;
  const [value, setValue] = useState(message.content);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  if (!message.id) throw new Error();
  return (
    <StyledRollingNew>
      <StyledRollingNewWrapper>
        <MessageSkin
          theme={emojis[theme][+emojiIndex].name}
          ColorName={activeColor}
          FontName={activeFont.name}
        >
          <Svg />
          <textarea value={value} onChange={(e) => setValue(e.target.value)} />
        </MessageSkin>
        <BottomSheet
          onToggle={() => setIsBottomSheetOpen((prev) => !prev)}
          isOpen={isBottomSheetOpen}
        >
          <StyledBottomSheetContentWrapper>
            <FontSelectorSheet
              activeMenuIndex={activeMenuIndex}
              setActiveMenuIndex={setActiveMenuIndex}
            >
              {activeMenuIndex === 0 ? (
                <FontList
                  activeFontIndex={activeFontIndex}
                  setActiveFontIndex={setActiveFontIndex}
                />
              ) : (
                <ColorList
                  theme={theme}
                  activeColorIndex={activeColorIndex}
                  setActiveColorIndex={setActiveColorIndex}
                />
              )}
            </FontSelectorSheet>
            <Button
              onClick={() => setIsModalOpen(true)}
              disabled={!value.length}
            >
              작성완료
            </Button>
          </StyledBottomSheetContentWrapper>
        </BottomSheet>
      </StyledRollingNewWrapper>
      <StyledOverlayBackdrop themeName={theme} />
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <Modal.CheckboxForm
            handleNameChange={handleNameChange}
            handleNameReset={handleNameReset}
            isError={isError}
            nickname={nickname}
            ref={nicknameRef}
          />
          <Modal.Buttons>
            <Modal.Button
              css={{ border: `1px solid ${themeObject.colors['gray-300']}` }}
              onClick={() => setIsModalOpen(false)}
            >
              닫기
            </Modal.Button>
            <Modal.Button
              isPending={isPending}
              isActionBtn
              css={{
                backgroundColor: themeObject.colors['gray-900'],
                color: themeObject.colors.white,
              }}
              onClick={handleMessageSubmit}
            >
              작성하기
            </Modal.Button>
          </Modal.Buttons>
        </Modal>
      )}
    </StyledRollingNew>
  );
}
