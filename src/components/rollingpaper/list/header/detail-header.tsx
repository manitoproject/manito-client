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
import DetailMessagelength from '@/components/rollingpaper/list/header/message-length';
import { useShare } from '@/hooks';
import { usePaperMessagesQuery } from '@/queries/message';
import { usePaperDetailQuery } from '@/queries/paper';
import { useUserQuery } from '@/queries/users';
import routes from '@/routes';
import { useToastActions } from '@/stores/toast-store';
import theme from '@/styles/theme';

interface DetailHeaderProps {
  paperId?: number;
}

export default function DetailHeader({ paperId }: DetailHeaderProps) {
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { data } = usePaperMessagesQuery();
  const { data: PaperData } = usePaperDetailQuery();
  const { data: userData } = useUserQuery();
  const toastActions = useToastActions();
  const { handleKakakoShare, handleUrlCopy } = useShare();
  const navigate = useNavigate();

  const handleShowDetailMessage = () => {
    if (data?.data?.length)
      return navigate(routes.rollingpaper.detail(paperId));
    toastActions.add('상세보기 내역이 없습니다.');
  };

  return (
    <StyledRollingHeader>
      <DetailMessagelength />
      <div>
        <button onClick={handleShowDetailMessage}>상세보기</button>
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
            <StyledModalLink
              onClick={() =>
                handleKakakoShare(
                  userData?.data?.originName,
                  PaperData?.data?.title,
                )
              }
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
          isOpen={isLoginModalOpen}
          onToggleModal={() => setIsLoginModalOpen((prev) => !prev)}
        />
      )}
    </StyledRollingHeader>
  );
}
