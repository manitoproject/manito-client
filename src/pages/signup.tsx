import styled from '@emotion/styled';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { Button } from '@/components/common/buttons/buttons';
import SignupRadioButton from '@/components/common/buttons/signup-radio-button';
import NameForm from '@/components/common/name-form';
import useNameForm from '@/hooks/use-name-form';
import useSetHeader from '@/hooks/use-set-header';
import { nicknameMaxLength } from '@/lib/regex-patterns';
import { useNicknameChange } from '@/mutations/users';
import routes from '@/routes';
import { getFontSizeAndWeight } from '@/styles/mixins';

export default function Signup() {
  const [activeRadioButtonIndex, setActiveRadioButtonIndex] = useState(0);
  const { mutate, isPending } = useNicknameChange();
  const location = useLocation();

  const { handleNameChange, handleNameReset, isError, name, nameRef } =
    useNameForm('nickname');

  const handleNicknameChange = (e: React.MouseEvent) => {
    if (!activeRadioButtonIndex) Navigate({ to: routes.landing });
    e.preventDefault();
    mutate(name);
  };

  if (location.state !== 'Y') Navigate({ to: routes.landing });

  useSetHeader({ title: '회원가입', rightBtn: false });

  return (
    <StyledWrapper>
      <StyledHeading>
        <h2>마니또에 오신 걸 환영합니다.</h2>
        <h3>
          사용하실 <strong>이름</strong>을 입력하시겠어요?
        </h3>
      </StyledHeading>
      <StyledNameFormWrapper>
        <SignupRadioButton
          activeRadioButtonIndex={activeRadioButtonIndex}
          setActiveRadioButtonIndex={setActiveRadioButtonIndex}
        />
        {activeRadioButtonIndex === 1 && (
          <NameForm
            ref={nameRef}
            isError={isError}
            maxLength={nicknameMaxLength}
            value={name}
            onChange={handleNameChange}
            onClick={handleNameReset}
          />
        )}
      </StyledNameFormWrapper>
      <div>
        <Button
          onClick={handleNicknameChange}
          backgroundColor="powderBlue-800"
          disabled={
            !!activeRadioButtonIndex && (!name.length || isError || isPending)
          }
        >
          가입완료
        </Button>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  div:last-of-type {
    margin-top: auto;
  }
`;

const StyledNameFormWrapper = styled.div`
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors['powderBlue-50']};
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
