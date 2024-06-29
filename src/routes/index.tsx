import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, KakaoLoginButton } from '../components/common/buttons';
import { getFontSizeAndWeight } from '../styles/utils';

export default function Index() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const navigate = useNavigate();
  return (
    <StyledWrapper>
      <div>작업 예정</div>
      {isButtonClicked ? (
        <KakaoLoginButton mb={50} onClick={() => navigate('/join')} />
      ) : (
        <Button mb={50} onClick={() => setIsButtonClicked(true)}>
          시작하기
        </Button>
      )}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  max-width: ${(props) => props.theme.sizes.mobile};
  margin: 0 auto;
  padding: ${(props) => props.theme.sizes.padding};
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);

  & > div:first-child {
    ${getFontSizeAndWeight('heading1', 'bold')}
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
  }
  display: flex;
  height: 100vh;
  align-items: flex-end;
`;
