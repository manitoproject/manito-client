import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Clip, KakaoFill } from '../../../../assets/svg/icons';
import { useMessageScreenActions } from '../../../../stores/message-screen-store';
import { useMessageActions } from '../../../../stores/message-store';
import { useToastActions } from '../../../../stores/toast-store';
import theme from '../../../../styles/theme';
import { Modal } from '../../../modal';
import LoginModal from '../../../modal/login-modal';
import {
  StyledModalLink,
  StyledModalLinks,
  StyledRollingHeader,
} from '../detail-header.style';
import DetailMessagelength from './message-length';

export default function DetailHeader() {
  const location = useLocation();
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const toastActions = useToastActions();
  const messageScreenActions = useMessageScreenActions();
  const messageActions = useMessageActions();

  const handleMessageScreenOpen = () => {
    if (messageActions.hasList()) {
      messageScreenActions.resetActiveIndex();
      return messageScreenActions.open();
    }
    toastActions.add('상세보기 내역이 없습니다.');
  };

  const handleUrlCopy = async () => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(
        `${import.meta.env.VITE_CLIENT_URL}${location.pathname}`,
      );
      toastActions.add('링크가 복사 되었습니다.');
    }
  };

  return (
    <StyledRollingHeader>
      <DetailMessagelength />
      <div>
        <button onClick={handleMessageScreenOpen}>상세보기</button>
        <button onClick={() => setIsCopyModalOpen(true)}>
          <Clip />
        </button>
      </div>
      {isCopyModalOpen && (
        <Modal
          isOpen={isCopyModalOpen}
          onClick={() => setIsCopyModalOpen((prev) => !prev)}
        >
          <Modal.TitleWrapper>
            <Modal.Title>공유하기</Modal.Title>
          </Modal.TitleWrapper>
          <StyledModalLinks>
            <StyledModalLink>
              <KakaoFill />
              <span>카카오톡</span>
            </StyledModalLink>
            <StyledModalLink onClick={handleUrlCopy}>
              <div>
                <Clip />
              </div>
              <span>URL 복사</span>
            </StyledModalLink>
          </StyledModalLinks>
          <Modal.Buttons>
            <Modal.Button
              onClick={() => setIsCopyModalOpen(false)}
              css={{ border: `1px solid ${theme.colors['gray-300']}` }}
            >
              닫기
            </Modal.Button>
          </Modal.Buttons>
        </Modal>
      )}
      {isLoginModalOpen && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onToggleModal={() => setIsLoginModalOpen((prev) => !prev)}
        />
      )}
    </StyledRollingHeader>
  );
}
