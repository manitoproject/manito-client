import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Clip, KakaoFill } from '../../assets/svg/icons';
import { usePaperMessagesQuery } from '../../queries/message';
import { useUserQuery } from '../../queries/users';
import toastStore from '../../stores/toastStore';
import theme from '../../styles/theme';
import LoginModal from '../modal/login-modal';
import { Modal } from '../modal/modal';
import {
  StyledModalLink,
  StyledModalLinks,
  StyledRollingHeader,
} from './detail-header.style';

interface DetailHeaderProps {
  paperId?: number;
}

export default function DetailHeader({ paperId }: DetailHeaderProps) {
  const { data: userData } = useUserQuery();
  const toast = toastStore();
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { data: messageData } = usePaperMessagesQuery(paperId);
  const location = useLocation();
  const handleDetailView = () => {
    if (!userData?.data) setIsLoginModalOpen(true);
  };

  const handleUrlCopy = async () => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(
        `${import.meta.env.VITE_CLIENT_URL}${location.pathname}`,
      );
      toast.add('링크가 복사 되었습니다.');
    }
  };

  return (
    <StyledRollingHeader>
      <span>
        <strong>{messageData?.data?.length}</strong>개의 작성물
      </span>
      <div>
        <button onClick={handleDetailView}>상세보기</button>
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
