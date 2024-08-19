import { useNameForm } from '../../hooks';
import { useCreateMessage } from '../../queries/message';
import { useModalIndex } from '../../stores/modal-store';
import theme, { ColorName, FontNameWithoutAppleFont } from '../../styles/theme';
import { Modal } from '.';

interface MessageCreateModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  font: FontNameWithoutAppleFont;
  color: ColorName;
  content: string;
  messageInfo: {
    position: number;
    paperId: number;
    emoji: string;
  };
}

export default function MessageCreateModal({
  isOpen,
  color,
  font,
  setIsOpen,
  content,
  messageInfo,
}: MessageCreateModalProps) {
  const { emoji, paperId, position } = messageInfo;
  const activeModalIndex = useModalIndex();
  const { mutate, isPending } = useCreateMessage(+paperId);
  const {
    handleNameChange,
    handleNameReset,
    isError,
    name: nickname,
    nameRef: nicknameRef,
  } = useNameForm('nickname');
  const handleMessageSubmit = () => {
    mutate({
      font,
      content: content,
      fontColor: color,
      position,
      theme: emoji,
      isPublic: activeModalIndex === 0 ? 'Y' : 'N',
      paperId: +paperId,
      anonymous: activeModalIndex === 1 ? nickname : '',
    });
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
      <Modal.RadioForm
        handleNameChange={handleNameChange}
        handleNameReset={handleNameReset}
        isError={isError}
        nickname={nickname}
        ref={nicknameRef}
      />
      <Modal.Buttons>
        <Modal.Button
          css={{ border: `1px solid ${theme.colors['gray-300']}` }}
          onClick={() => setIsOpen(false)}
        >
          닫기
        </Modal.Button>
        <Modal.Button
          isPending={isPending}
          isActionBtn
          css={{
            backgroundColor: theme.colors['gray-900'],
            color: theme.colors.white,
          }}
          onClick={handleMessageSubmit}
        >
          작성하기
        </Modal.Button>
      </Modal.Buttons>
    </Modal>
  );
}
