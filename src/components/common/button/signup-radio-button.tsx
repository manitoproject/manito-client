import styled from '@emotion/styled';

import RadioButton from './radio-button';

interface RadioButtonsProps {
  activeRadioButtonIndex: number;
  setActiveRadioButtonIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function SignupRadioButton({
  activeRadioButtonIndex,
  setActiveRadioButtonIndex,
}: RadioButtonsProps) {
  return (
    <StyledRadioButtonWrapper>
      <RadioButton
        isActive={activeRadioButtonIndex === 0}
        onChangeIndex={() => setActiveRadioButtonIndex(0)}
      >
        <p>
          안할래요!
          <span>(가입한 이름으로 설정됩니다.)</span>
        </p>
      </RadioButton>
      <RadioButton
        isActive={activeRadioButtonIndex === 1}
        onChangeIndex={() => setActiveRadioButtonIndex(1)}
      >
        <p>직접 입력 할래요!</p>
      </RadioButton>
    </StyledRadioButtonWrapper>
  );
}
const StyledRadioButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
