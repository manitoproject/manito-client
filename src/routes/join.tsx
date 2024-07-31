import styled from '@emotion/styled';
import { Navigate, useLocation } from 'react-router-dom';

import { Button } from '../components/common/buttons';
import NameForm from '../components/common/name-form';
import { nicknameMaxLength } from '../constants/regexPatterns';
import { useNameForm } from '../hooks';
import { useNicknameChange } from '../queries/users';
import { routes } from '../router';
import { getFontSizeAndWeight } from '../utils/style';

export default function Join() {
  const { mutate, isPending } = useNicknameChange();
  const { handleNameChange, handleNameReset, isError, name, nameRef } =
    useNameForm('nickname');
  const handleNicknameChange = (e: React.MouseEvent) => {
    e.preventDefault();
    mutate(name);
  };
  const location = useLocation();

  if (location.state !== 'Y') {
    Navigate({ to: routes.index });
  }

  return (
    <StyledWrapper>
      <NameForm
        ref={nameRef}
        isError={isError}
        maxLength={nicknameMaxLength}
        value={name}
        onChange={handleNameChange}
        onClick={handleNameReset}
      >
        <StyledHeading>
          <h2>마니또에 오신 걸 환영합니다.</h2>
          <h3>
            사용하실 <strong>이름</strong>을 입력해주세요.
          </h3>
        </StyledHeading>
      </NameForm>
      <div>
        <Button
          onClick={handleNicknameChange}
          backgroundColor="powderBlue-800"
          disabled={!name.length || isError || isPending}
        >
          가입완료
        </Button>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  div {
    margin-top: auto;
  }
`;

const StyledHeading = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: column;
  h2 {
    ${getFontSizeAndWeight('heading2', 'medium')}
    color: ${(props) => props.theme.colors['gray-800']};
  }
  h3 {
    ${getFontSizeAndWeight('heading1', 'bold')}
    color: ${(props) => props.theme.colors['gray-900']};
    strong {
      color: ${(props) => props.theme.colors['powderBlue-900']};
    }
  }
`;
