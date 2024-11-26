import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Clip, KakaoFill } from '@/assets/svg/icons';
import {
  StyledListHeader,
  StyledShareLinkBtn,
  StyledShareModal,
} from '@/components/list/header.style';
import { Modal } from '@/components/modal';
import LoginModal from '@/components/modal/login-modal';
import useShare from '@/hooks/use-share';
import { paperQueries, userQueries } from '@/lib/query-factory';
import routes from '@/routes';
import { useToastActions } from '@/stores/toast-store';
import theme from '@/styles/theme';

interface DetailHeaderProps {
  content: RouteContentType;
  children: React.ReactNode;
  messageLength?: number;
}

export default function ListHeader({
  content,
  children,
  messageLength,
}: DetailHeaderProps) {
  const params = useParams();
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { data: user } = useQuery(userQueries.detail());
  const { data: paper } = useQuery(paperQueries.detail(Number(params.id)));
  const toastActions = useToastActions();
  const { handleKakakoShare, handleUrlCopy } = useShare(content);
  const navigate = useNavigate();

  const handleShowDetailMessage = () => {
    if (messageLength) {
      navigate(routes[content].detail(paper?.id));
    } else {
      toastActions.add('상세보기 내역이 없습니다.');
    }
  };

  return (
    <StyledListHeader>
      {children}
      <div>
        <button onClick={handleShowDetailMessage}>상세보기</button>
        <button onClick={() => setIsCopyModalOpen(true)}>
          <Clip />
        </button>
      </div>
      {isCopyModalOpen && (
        <Modal onClick={() => setIsCopyModalOpen((prev) => !prev)}>
          <Modal.TitleWrapper>
            <Modal.Title>공유하기</Modal.Title>
          </Modal.TitleWrapper>
          <StyledShareModal>
            <StyledShareLinkBtn
              onClick={() => handleKakakoShare(user?.originName, paper?.title)}
            >
              <KakaoFill />
              <span>카카오톡</span>
            </StyledShareLinkBtn>
            <StyledShareLinkBtn onClick={handleUrlCopy}>
              <div>
                <Clip />
              </div>
              <span>URL 복사</span>
            </StyledShareLinkBtn>
          </StyledShareModal>
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
          onToggleModal={() => setIsLoginModalOpen((prev) => !prev)}
        />
      )}
    </StyledListHeader>
  );
}
