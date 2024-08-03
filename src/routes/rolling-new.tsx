import { useState } from 'react';

import MessageCreateModal from '../components/message-form/message-create-modal';
import MessageForm from '../components/message-form/message-form';
import { useLocationStateProps } from '../hooks';
import { ColorName, FontNameWithoutAppleFont } from '../styles/theme';
import { StyledOverlayBackdrop, StyledRollingNew } from './rolling-new.style';

export default function RollingNew() {
  const messageInfo = useLocationStateProps();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFont, setActiveFont] =
    useState<FontNameWithoutAppleFont>('Cafe24Ssurround');
  const [activeColor, setActiveColor] = useState<ColorName>('white');
  const [content, setContent] = useState('');
  const isMessage = 'id' in messageInfo;

  return (
    <StyledRollingNew>
      <MessageForm
        emoji={isMessage ? messageInfo.theme : messageInfo.emoji}
        setIsModalOpen={setIsModalOpen}
        color={activeColor}
        content={content}
        font={activeFont}
        setColor={setActiveColor}
        setContent={setContent}
        setFont={setActiveFont}
      />
      <StyledOverlayBackdrop themeName={messageInfo.rollingThemeName} />
      {!isMessage && (
        <MessageCreateModal
          color={activeColor}
          font={activeFont}
          isOpen={isModalOpen}
          content={content}
          setIsOpen={setIsModalOpen}
          messageInfo={messageInfo}
        />
      )}
    </StyledRollingNew>
  );
}
