import { useEffect, useState } from 'react';

import { Button } from '../components/common/buttons';
import BottomSheet from '../components/detail/bottom-sheet/bottom-sheet';
import { StyledBottomSheetContentWrapper } from '../components/detail/bottom-sheet/bottom-sheet.style';
import ColorList from '../components/detail/bottom-sheet/font-sheet/color-list';
import FontList from '../components/detail/bottom-sheet/font-sheet/font-list';
import FontSelectorSheet from '../components/detail/bottom-sheet/font-sheet/font-selector-sheet';
import { Modal } from '../components/modal/modal';
import emojis from '../constants/emojis';
import { colors, fonts } from '../constants/fonts';
import { useNameForm, useValidationQueryString } from '../hooks';
import { useCreateMessage } from '../queries/message';
import useModalStore from '../stores/modalStore';
import themeObject from '../styles/theme';
import {
  StyledEmojiWrapper,
  StyledOverlayBackdrop,
  StyledRollingNew,
  StyledRollingNewWrapper,
} from './rolling-new.style';

export type EmojiType = 'Circle' | 'Square' | 'Rest';
const EMOJI_TYPE: EmojiType[] = ['Circle', 'Square', 'Rest'];

export default function RollingNew() {
  const { emojiIndex, paperId, theme, position } = useValidationQueryString();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const { activeIndex } = useModalStore();
  const [activeFontIndex, setActiveFontIndex] = useState(0);
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [message, setMessage] = useState('');
  const {
    handleNameChange,
    handleNameReset,
    isError,
    name: nickname,
    nameRef: nicknameRef,
  } = useNameForm('nickname');

  const { mutate } = useCreateMessage(+paperId);
  const activeFont = fonts[activeFontIndex];
  const activeColor = colors[theme][activeColorIndex];
  const { svg: Svg, name } = emojis[theme][+emojiIndex];
  const emojiType: EmojiType = EMOJI_TYPE.filter((type, i) => {
    if (EMOJI_TYPE.length - 1 === i) return true;
    return name.includes(type);
  })[0];

  const handleMessageSubmit = () => {
    mutate({
      font: activeFont.name,
      content: message,
      fontColor: activeColor,
      position: +position,
      theme: emojis[theme][+emojiIndex].name,
      isPublic: activeIndex === 0 ? 'Y' : 'N',
      paperId: +paperId,
      anonymous: activeIndex === 1 ? nickname : '',
    });
  };

  useEffect(() => {
    setIsBottomSheetOpen(true);
  }, []);

  return (
    <StyledRollingNew>
      <StyledRollingNewWrapper>
        <StyledEmojiWrapper
          font={activeFont}
          color={activeColor}
          type={emojiType}
        >
          <Svg />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </StyledEmojiWrapper>
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
              disabled={!message.length}
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
