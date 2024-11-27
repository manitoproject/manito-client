import { Button } from '@/components/common/buttons/buttons';
import NameForm from '@/components/common/name-form';
import ReactHelmet from '@/helmet';
import useNameForm from '@/hooks/use-name-form';
import useSetHeader from '@/hooks/use-set-header';
import { titleMaxLength } from '@/lib/regex-patterns';
import { useCreatePaper } from '@/mutations/paper';
import {
  StyledSetupHeading,
  StyledSetupNameFormWrapper,
  StyledSetupWrapper,
} from '@/styles/styled';

export default function MakeCakeSetup() {
  const { handleNameChange, handleNameReset, isError, name, nameRef } =
    useNameForm('title');
  const { mutate, isPending } = useCreatePaper('makecake');

  const handleSubmit = () => {
    mutate({
      category: 'CAKE',
      title: name,
      theme: 'animal',
    });
  };

  useSetHeader({ title: '케이크 만들기', rightBtn: false });

  return (
    <StyledSetupWrapper>
      <StyledSetupNameFormWrapper>
        <NameForm
          placeholder="제목을 입력해주세요."
          ref={nameRef}
          onChange={handleNameChange}
          value={name}
          isError={isError}
          maxLength={titleMaxLength}
          onClick={handleNameReset}
        >
          <StyledSetupHeading>
            <h2>케이크</h2>
            <h3>
              <strong>제목</strong>을 입력해주세요.
            </h3>
          </StyledSetupHeading>
        </NameForm>
      </StyledSetupNameFormWrapper>
      <Button
        disabled={!name.length || isError || isPending}
        onClick={handleSubmit}
      >
        시작하기
      </Button>
      <ReactHelmet title={`케이크 만들기 - 마니또`} />
    </StyledSetupWrapper>
  );
}
