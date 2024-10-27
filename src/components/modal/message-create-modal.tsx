import { Modal } from '@/components/modal';
import { useNameForm } from '@/hooks';
import { useCreateMessage } from '@/queries/message';
import { useMessageInfo } from '@/stores/message-store';
import { useModalIndex } from '@/stores/modal-store';
import theme, { ColorName, FontNameWithoutAppleFont } from '@/styles/theme';

export type Content = 'cake' | 'rollingpaper';

interface MessageCreateModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  content: string;
  contentType: Content;
  font: FontNameWithoutAppleFont;
  color: ColorName;
  id: number;
}

export default function MessageCreateModal({
  isOpen,
  setIsOpen,
  content,
  contentType,
  color,
  font,
  id,
}: MessageCreateModalProps) {
  const info = useMessageInfo();
  const activeModalIndex = useModalIndex();
  const { mutate, isPending } = useCreateMessage(id, contentType);
  const {
    handleNameChange,
    handleNameReset,
    isError,
    name: nickname,
    nameRef: nicknameRef,
  } = useNameForm('nickname');
  const handleMessageSubmit = () => {
    if (!info.position || !info.theme)
      return console.log('message 정보가 없음');
    mutate({
      font,
      content: content,
      fontColor: color,
      position: info.position,
      theme: info.theme,
      isPublic: activeModalIndex === 0 ? 'Y' : 'N',
      paperId: id,
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
