import { Button } from '@/components/common/button/buttons';
import NameForm from '@/components/common/name-form';
import { titleMaxLength } from '@/constants/regex-patterns';
import { useNameForm, useSetHeader } from '@/hooks';
import { useCreatePaper } from '@/queries/paper';
import {
  StyledHeading,
  StyledSectionWrapper,
  StyledWrapper,
} from '@/routes/rollingpaper/setup.style';

export default function CakeSetup() {
  const { handleNameChange, handleNameReset, isError, name, nameRef } =
    useNameForm('title');
  const { mutate, isPending } = useCreatePaper('cake');
  useSetHeader({ title: '케이크 만들기', rightBtn: false });
  const handleSubmit = () => {
    mutate({
      category: 'CAKE',
      title: name,
      theme: 'animal',
    });
  };

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
            <h2>케이크</h2>
            <h3>
              <strong>제목</strong>을 입력해주세요.
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
