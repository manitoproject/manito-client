import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Clip, KakaoFill } from '../../assets/svg/icons';
import { usePaperMessagesQuery } from '../../queries/message';
import { useUserQuery } from '../../queries/users';
import { routes } from '../../router';
import theme from '../../styles/theme';
import { getFontSizeAndWeight } from '../../utils/style';
import { Modal } from '../modal/modal';

interface DetailHeaderProps {
  paperId?: number;
}

export default function DetailHeader({ paperId }: DetailHeaderProps) {
  const { data: userData } = useUserQuery();
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { data: messageData } = usePaperMessagesQuery(paperId);
  const navigate = useNavigate();
  const handleDetailView = () => {
    if (!userData?.data) setIsLoginModalOpen(true);
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
            <StyledModalLink>
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

const StyledRollingHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    color: ${(props) => props.theme.colors['gray-800']};
    ${getFontSizeAndWeight('heading3', 'regular')};
    strong {
      font-weight: 700;
      color: ${(props) => props.theme.colors['gray-900']};
    }
  }
  div {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  button:nth-of-type(1) {
    height: 40px;
    padding: 8px 16px;
    ${getFontSizeAndWeight('body1', 'medium')}
    color:${({ theme }) => theme.colors.black};
    border: 1px solid ${({ theme }) => theme.colors['gray-300']};
  }
  button {
    padding: 8px;
    border-radius: 4px;
    background-color: ${(props) => props.theme.colors['gray-100']};
  }
`;

const StyledModalLinks = styled.div`
  display: flex;
  gap: 20px;
`;
const StyledModalLink = styled.button`
  padding: 0 16px;
  align-items: center;
  div {
    border-radius: 4px;
    padding: 15px;
    background-color: ${({ theme }) => theme.colors['gray-100']};
  }
  display: flex;
  gap: 12px;
  flex-direction: column;
`;
