import { useNavigate } from 'react-router-dom';

import { Modal } from '@/components/modal';
import routes from '@/routes';
import {
  useLoginModal,
  useLoginModalActions,
} from '@/stores/login-modal-store';
import theme from '@/styles/theme';

export default function LoginModal() {
  const isOpen = useLoginModal();
  const { toggleOpen } = useLoginModalActions();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <Modal onClose={() => toggleOpen(false)}>
      <Modal.TitleWrapper>
        <Modal.Title>
          로그인 후 이용할 수 있는
          <br />
          컨텐츠 입니다.
        </Modal.Title>
        <Modal.Description>
          확인을 누르시면 로그인 페이지로 이동합니다.
        </Modal.Description>
      </Modal.TitleWrapper>
      <Modal.Buttons>
        <Modal.Button
          onClick={() => toggleOpen(false)}
          css={{ border: `1px solid ${theme.colors['gray-300']}` }}
        >
          닫기
        </Modal.Button>
        <Modal.Button
          onClick={() => navigate(routes.landing)}
          css={{
            backgroundColor: theme.colors.black,
            color: theme.colors.white,
          }}
        >
          확인
        </Modal.Button>
      </Modal.Buttons>
    </Modal>
  );
}
