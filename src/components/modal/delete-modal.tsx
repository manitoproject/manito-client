import { Modal } from '@/components/modal';
import theme from '@/styles/theme';

interface DeleteModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: () => void;
  message: '편지' | '컨텐츠'; // 메시지 삭제일경우 편지
}

export default function DeleteModal({
  setIsOpen,
  onDelete,
  message,
}: DeleteModalProps) {
  return (
    <Modal onClick={() => setIsOpen((prev) => !prev)}>
      <Modal.TitleWrapper>
        <Modal.Title>작성된 {message}를 삭제하시겠습니까?</Modal.Title>
        <Modal.Description>
          삭제한 {message}는 되돌릴 수 없습니다.
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
          onClick={onDelete}
        >
          삭제하기
        </Modal.Button>
      </Modal.Buttons>
    </Modal>
  );
}
