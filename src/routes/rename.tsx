import { Camera } from '../assets/svg/icons';
import { Button } from '../components/common/buttons';
import NameForm from '../components/common/name-form';
import { nicknameMaxLength } from '../constants/regexPatterns';
import { useNameForm } from '../hooks';
import { useNicknameChange } from '../queries/users';
import { StyledAvartarWrapper, StyledRenameWrapper } from './rename.style';

export default function Rename() {
  const { mutate, isPending } = useNicknameChange(true);
  const { handleNameChange, handleNameReset, isError, name, nameRef } =
    useNameForm('nickname');

  const handleNicknameChange = () => {
    mutate(name);
  };

  return (
    <StyledRenameWrapper>
      <StyledAvartarWrapper>
        <button>
          <img src="/src/assets/imgs/user/avatar.png" alt="avartar" />
          <Camera />
        </button>
      </StyledAvartarWrapper>
      <h3>이름</h3>
      <NameForm
        ref={nameRef}
        isError={isError}
        maxLength={nicknameMaxLength}
        value={name}
        onChange={handleNameChange}
        onClick={handleNameReset}
      >
        {null}
      </NameForm>
      <div>
        <Button
          onClick={handleNicknameChange}
          hasMarginBottom
          disabled={isError || !name.length || isPending}
        >
          수정하기
        </Button>
      </div>
    </StyledRenameWrapper>
  );
}
