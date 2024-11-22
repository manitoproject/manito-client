import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Clip, KakaoFill } from '@/assets/svg/icons';
import { Modal } from '@/components/modal';
import LoginModal from '@/components/modal/login-modal';
import {
  StyledModalLink,
  StyledModalLinks,
  StyledRollingHeader,
} from '@/components/rollingpaper/list/header/detail-header.style';
import useShare from '@/hooks/use-share';
import { messageQueries, userQueries } from '@/lib/query-factory';
import routes from '@/routes';
import { useToastActions } from '@/stores/toast-store';
import theme from '@/styles/theme';

interface DetailHeaderProps {
  paper?: Paper;
  content: RouteContentType;
}

export default function DetailHeader({ paper, content }: DetailHeaderProps) {
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { data: messages } = useQuery(messageQueries.paper(paper?.id));
  const { data: user } = useQuery(userQueries.detail());
  const toastActions = useToastActions();
  const { handleKakakoShare, handleUrlCopy } = useShare();
  const navigate = useNavigate();

  const handleShowDetailMessage = () => {
    if (messages?.length) return navigate(routes[content].detail(paper?.id));
    toastActions.add('상세보기 내역이 없습니다.');
  };

  return (
    <StyledRollingHeader>
      <span>
        <strong>{messages?.length}</strong>
        개의 작성물
      </span>
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
          <StyledModalLinks>
            <StyledModalLink
              onClick={() => handleKakakoShare(user?.originName, paper?.title)}
            >
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
          onToggleModal={() => setIsLoginModalOpen((prev) => !prev)}
        />
      )}
    </StyledRollingHeader>
  );
}
