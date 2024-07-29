import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Clip, KakaoFill } from '../../assets/svg/icons';
import { usePaperMessagesQuery } from '../../queries/message';
import { useUserQuery } from '../../queries/users';
import { routes } from '../../router';
import toastStore from '../../stores/toastStore';
import theme from '../../styles/theme';
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
  const navigate = useNavigate();
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
        <Modal
          isOpen={isLoginModalOpen}
          onClick={() => setIsLoginModalOpen((prev) => !prev)}
        >
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
              onClick={() => setIsLoginModalOpen(false)}
              css={{ border: `1px solid ${theme.colors['gray-300']}` }}
            >
              닫기
            </Modal.Button>
            <Modal.Button
              onClick={() => navigate(routes.index)}
              css={{
                backgroundColor: theme.colors.black,
                color: theme.colors.white,
              }}
            >
              확인
            </Modal.Button>
          </Modal.Buttons>
        </Modal>
      )}
    </StyledRollingHeader>
  );
}
