import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/common/buttons';
import Input from '../components/common/input';
import { getFontSizeAndWeight } from '../styles/utils';

const MAX_LENGTH = 20;
const NICKNAME_REGEX = /^(?=.*[a-z가-힣])[a-z가-힣]{1,20}$/;

export default function Join() {
  const [nickname, setNickname] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const isSuccess = NICKNAME_REGEX.test(value);
    setIsError(!isSuccess);
    setNickname(e.target.value);
  };

  const handleNicknameReset = () => {
    setNickname('');
    if (isError) setIsError(false);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <StyledWrapper>
      <section>
        <StyeldTitle>
          <h2>마니또에 오신 걸 환영합니다.</h2>
          <h3>
            사용하실 <strong>이름</strong>을 입력해주세요.
          </h3>
        </StyeldTitle>
        <StyledForm onSubmit={handleSubmit}>
          <Input
            ref={inputRef}
            isError={isError}
            onClick={handleNicknameReset}
            placeholder="이름을 입력해주세요."
            value={nickname}
            onChange={handleNicknameChange}
          >
            <span>
              {nickname.length} /<strong> {MAX_LENGTH}</strong>
            </span>
          </Input>
          <div>
            <Button
              backgroundColor="powderBlue-800"
              hasMarginBottom
              type="submit"
              disabled={!nickname.length || isError}
            >
              가입완료
            </Button>
          </div>
        </StyledForm>
      </section>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  section {
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1;
  }
`;

const StyeldTitle = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: column;
  h2 {
    ${getFontSizeAndWeight('heading3', 'regular')}
    color: ${(props) => props.theme.colors.gray[800]};
  }
  h3 {
    ${getFontSizeAndWeight('heading1', 'bold')}
    color: ${(props) => props.theme.colors.gray[900]};
    strong {
      color: ${(props) => props.theme.colors.powderBlue[900]};
    }
  }
`;

const StyledForm = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  & > div:first-child {
    flex: 1;
  }
`;
