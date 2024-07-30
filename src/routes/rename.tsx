import { Button } from '../components/common/buttons';
import NameForm from '../components/common/name-form';
import { defaultKaKaoUserProfile } from '../constants/profile';
import { nicknameMaxLength } from '../constants/regexPatterns';
import { useNameForm } from '../hooks';
import {
  useNicknameChange,
  useProfileChange,
  useUserQuery,
} from '../queries/users';
import { StyledAvartarWrapper, StyledRenameWrapper } from './rename.style';

export default function Rename() {
  const { data } = useUserQuery();
  const { mutate, isPending } = useNicknameChange(true);
  const { mutate: profileMutate } = useProfileChange();
  const { handleNameChange, handleNameReset, isError, name, nameRef } =
    useNameForm('nickname');

  const handleNicknameChange = () => {
    mutate(name);
  };

  const handleProfileChange = () => {
    if (data?.data?.isOriginProfile === 'Y') return;
    profileMutate();
  };

  return (
    <StyledRenameWrapper>
      <StyledAvartarWrapper
        isOriginProfile={data?.data?.isOriginProfile === 'Y'}
      >
        <button>
          <img
            src={
              data?.data?.isOriginProfile === 'Y'
                ? defaultKaKaoUserProfile
                : data?.data?.profileImage
            }
            alt="avartar"
          />
        </button>
        <button onClick={handleProfileChange}>기본프로필로변경</button>
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
