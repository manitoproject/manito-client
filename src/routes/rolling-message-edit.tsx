import { useState } from 'react';

import MessageForm from '../components/message-form/message-form';
import { useLocationStateProps } from '../hooks';
import { useEditMessage } from '../queries/message';
import { ColorName, FontNameWithoutAppleFont } from '../styles/theme';
import { StyledOverlayBackdrop, StyledRollingNew } from './rolling-new.style';

export default function RollingMessageEdit() {
  const messageInfo = useLocationStateProps();
  const isEditPage = 'id' in messageInfo;
  const { mutate } = useEditMessage(messageInfo.paperId);
  const [activeFont, setActiveFont] = useState<FontNameWithoutAppleFont>(
    isEditPage ? messageInfo.font : 'Cafe24Ssurround',
  );
  const [activeColor, setActiveColor] = useState<ColorName>(
    isEditPage ? messageInfo.fontColor : 'white',
  );
  const [content, setContent] = useState(
    isEditPage ? messageInfo.content : 'white',
  );

  const handleSubmit = () => {
    if ('id' in messageInfo) {
      mutate({
        content,
        font: activeFont,
        fontColor: activeColor,
        id: messageInfo.id,
      });
    }
  };
  return (
    <StyledRollingNew>
      <MessageForm
        emoji={isEditPage ? messageInfo.theme : messageInfo.emoji}
        handleSubmit={handleSubmit}
        color={activeColor}
        content={content}
        font={activeFont}
        setColor={setActiveColor}
        setContent={setContent}
        setFont={setActiveFont}
      />
      <StyledOverlayBackdrop themeName={messageInfo.rollingThemeName} />
    </StyledRollingNew>
  );
}
