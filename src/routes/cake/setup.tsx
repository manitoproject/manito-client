import { Button } from '../../components/common/button/buttons';
import NameForm from '../../components/common/name-form';
import { titleMaxLength } from '../../constants/regex-patterns';
import { useNameForm } from '../../hooks';
import { useCreatePaper } from '../../queries/paper';
import {
  StyledHeading,
  StyledSectionWrapper,
  StyledWrapper,
} from '../rollingpaper/setup.style';

export default function CakeSetup() {
  const { handleNameChange, handleNameReset, isError, name, nameRef } =
    useNameForm('title');
  const { mutate, isPending, data } = useCreatePaper('cake');
  const handleSubmit = () => {
    mutate({
      category: 'CAKE',
      title: name,
      theme: 'animal',
    });
  };

  console.log({ data });

  return (
    <StyledWrapper>
      <StyledSectionWrapper>
        <NameForm
          ref={nameRef}
          onChange={handleNameChange}
          value={name}
          isError={isError}
          maxLength={titleMaxLength}
          onClick={handleNameReset}
        >
          <StyledHeading>
            <h3>
              <strong>케이크 제목</strong>을 입력해주세요.
            </h3>
          </StyledHeading>
        </NameForm>
      </StyledSectionWrapper>
      <Button
        disabled={!name.length || isError || isPending}
        onClick={handleSubmit}
      >
        시작하기
      </Button>
    </StyledWrapper>
  );
}
