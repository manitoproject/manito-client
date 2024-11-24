import styled from '@emotion/styled';

import { Button } from '@/components/common/buttons/buttons';
import NameForm from '@/components/common/name-form';
import useNameForm from '@/hooks/use-name-form';
import useSetHeader from '@/hooks/use-set-header';
import { titleMaxLength } from '@/lib/regex-patterns';
import { useCreatePaper } from '@/mutations/paper';
import { StyledBackdrop } from '@/pages/rollingpaper/list.style';
import { getFontSizeAndWeight } from '@/styles/mixins';
import {
  StyledSetupNameFormWrapper,
  StyledSetupWrapper,
} from '@/styles/styled';

export default function TreasureBoxSetup() {
  const { handleNameChange, handleNameReset, isError, name, nameRef } =
    useNameForm('title');
  const { mutate, isPending } = useCreatePaper('treasurebox');

  const handleSubmit = () => {
    mutate({
      category: 'TREASURE',
      title: name,
      theme: 'animal',
    });
  };

  useSetHeader({
    title: '제목 입력',
    rightBtn: false,
    bg: 'brown-300',
    color: 'brown-700',
    font: 'Cafe24Ohsquare',
  });

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
          <StyledTreasureSetupHeading>
            <h2>
              <span>보물상자 제목</span>을 입력해주세요.
            </h2>
          </StyledTreasureSetupHeading>
        </NameForm>
      </StyledSetupNameFormWrapper>
      <Button
        font="Cafe24Ohsquare"
        disabled={!name.length || isError || isPending}
        onClick={handleSubmit}
      >
        시작하기
      </Button>
      <StyledTreasureBackdrop bg="" />
    </StyledSetupWrapper>
  );
}

const StyledTreasureSetupHeading = styled.div`
  z-index: 1;
  font-family: ${({ theme }) => theme.fontFamily.Cafe24Ohsquare};
  ${getFontSizeAndWeight('heading1', 'bold')}
  span {
    color: ${({ theme }) => theme.colors['brown-700']};
  }
`;

const StyledTreasureBackdrop = styled(StyledBackdrop)`
  background: linear-gradient(180deg, #fff8ea 0%, #dbceb5 100%);
`;
