import theme from '../../styles/theme';
import { Modal } from './modal';

interface DeleteModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handler: () => void;
  isMessageDelete: boolean;
}

export default function DeleteModal({
  isOpen,
  setIsOpen,
  handler,
  isMessageDelete,
}: DeleteModalProps) {
  const type = isMessageDelete ? '편지' : '컨텐츠';
  return (
    <Modal isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)}>
      <Modal.TitleWrapper>
        <Modal.Title>작성된 {type}를 삭제하시겠습니까?</Modal.Title>
        <Modal.Description>
          삭제한 {type}는 되돌릴 수 없습니다.
        </Modal.Description>
      </Modal.TitleWrapper>
      <Modal.Buttons>
        <Modal.Button
          css={{ border: `1px solid ${theme.colors['gray-300']}` }}
          onClick={() => setIsOpen(false)}
        >
          닫기
        </Modal.Button>
        <Modal.Button
          css={{
            background: theme.colors['black'],
            color: theme.colors.white,
          }}
          onClick={handler}
        >
          삭제하기
        </Modal.Button>
      </Modal.Buttons>
    </Modal>
  );
}
