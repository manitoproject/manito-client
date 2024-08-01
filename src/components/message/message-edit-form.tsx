import { useState } from 'react';

import emojis from '../../constants/emojis';
import { colors, fonts, ThemeColor } from '../../constants/fonts';
import { useNameForm, useValidationQueryString } from '../../hooks';
import {
  StyledOverlayBackdrop,
  StyledRollingNew,
  StyledRollingNewWrapper,
} from '../../routes/rolling-new.style';
import useModalStore from '../../stores/modal-store';
import { FontName, FontNameWithoutAppleGothic } from '../../styles/theme';
import { Modal } from '../modal/modal';
import themeObject from '../styles/theme';
import MessageSkin from './message-skin';

export default function MessageEditForm() {
  const { activeIndex } = useModalStore();

  const { emojiIndex, paperId, theme, position } = useValidationQueryString();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeFont, setActiveFont] = useState<FontNameWithoutAppleGothic>();
  const [activeColor, setactiveColor] = useState<ThemeColor<'animal'>>();
  // const [activeFontIndex, setActiveFontIndex] = useState(0);
  // const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [message, setMessage] = useState('');
  const {
    handleNameChange,
    handleNameReset,
    isError,
    name: nickname,
    nameRef: nicknameRef,
  } = useNameForm('nickname');

  // const { mutate, isPending } = useCreateMessage(+paperId);
  const { svg: Svg } = emojis[theme][+emojiIndex];

  const handleMessageSubmit = () => {
    // mutate({
    //   font: activeFont.name,
    //   content: message,
    //   fontColor: activeColor,
    //   position: +position,
    //   theme: emojis[theme][+emojiIndex].name,
    //   isPublic: activeIndex === 0 ? 'Y' : 'N',
    //   paperId: +paperId,
    //   anonymous: activeIndex === 1 ? nickname : '',
    // });
  };

  return (
    <StyledRollingNew>
      <StyledRollingNewWrapper>
        <MessageSkin
          theme={emojis[theme][+emojiIndex].name}
          ColorName={activeColor}
          FontName={activeFont}
        >
          <Svg />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </MessageSkin>
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
