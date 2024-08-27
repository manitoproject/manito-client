import { kakaoProfile } from '../assets/imgs';
import { Button } from '../components/common/button/buttons';
import NameForm from '../components/common/name-form';
import { nicknameMaxLength } from '../constants/regex-patterns';
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
  const user = data?.data;

  const handleProfileChange = () => {
    if (user?.isOriginProfile === 'N') return;
    profileMutate();
  };

  return (
    <StyledRenameWrapper>
      <StyledAvartarWrapper isOriginProfile={user?.isOriginProfile === 'N'}>
        <button>
          <img
            src={
              user?.isOriginProfile === 'N' ? kakaoProfile : user?.profileImage
            }
            alt="avartar"
          />
        </button>
        {user?.isOriginProfile == 'Y' && (
          <button onClick={handleProfileChange}>기본프로필로변경</button>
        )}
      </StyledAvartarWrapper>
      <h3>이름</h3>
      <NameForm
        ref={nameRef}
        isError={isError}
        maxLength={nicknameMaxLength}
        value={name}
        onChange={handleNameChange}
        onClick={handleNameReset}
      />
      <div>
        <Button
          onClick={handleNicknameChange}
          disabled={isError || !name.length || isPending}
        >
          수정하기
        </Button>
      </div>
    </StyledRenameWrapper>
  );
}
