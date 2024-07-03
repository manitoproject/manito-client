import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/common/buttons';
import Input from '../components/common/input';
import { getFontSizeAndWeight } from '../styles/utils';

const MAX_LENGTH = 10;

export default function ContentHome() {
  const [title, setTitle] = useState('');
  const [showDetail, setShowDetail] = useState(false);
  const [isError, setIsError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setIsError(MAX_LENGTH < value.length);
    setTitle(value);
  };

  const handleButtonClick = () => {
    if (!showDetail) return setShowDetail(true);
    navigate(`/rolling-paper/${Math.random().toString(36).slice(2, 9)}`);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <StyledWrapper>
      {!showDetail ? (
        <div>작업 예정</div>
      ) : (
        <StyledSectionWrapper>
          <section>
            <div>
              <h1>롤링페이퍼</h1>
              <h2>
                <strong>제목</strong>을 입력해주세요.
              </h2>
            </div>
            <div>
              <Input
                isError={isError}
                onClick={() => setTitle('')}
                value={title}
                onChange={handleTitleChange}
              >
                <span>
                  {title.length} / {MAX_LENGTH}
                </span>
              </Input>
            </div>
          </section>
          <section>
            <h2>원하는 테마를 선택해주세요.</h2>
          </section>
        </StyledSectionWrapper>
      )}
      <Button
        disabled={(showDetail && !title.length) || isError}
        mb={50}
        onClick={handleButtonClick}
      >
        시작하기
      </Button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  button {
    margin-top: auto;
  }
`;

const StyledSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  section:nth-child(1) {
    display: flex;
    flex-direction: column;
    gap: 12px;
    div:nth-child(1) {
      h1,
      h2 {
        color: ${(props) => props.theme.colors.gray[900]};
        ${getFontSizeAndWeight('heading3', 'medium')};
      }
      strong {
        font-size: 18px;
        color: ${(props) => props.theme.colors.powderBlue[900]};
        ${getFontSizeAndWeight('heading2', 'bold')};
      }
    }
  }
  section:nth-child(2) {
    h2 {
      ${getFontSizeAndWeight('heading3', 'medium')};
    }
  }
`;
