import { useQuery } from '@tanstack/react-query';

import { kakaoProfile } from '@/assets/imgs';
import { Button } from '@/components/common/button/buttons';
import NameForm from '@/components/common/name-form';
import ReactHelmet from '@/helmet';
import useNameForm from '@/hooks/use-name-form';
import useSetHeader from '@/hooks/use-set-header';
import { userQueries } from '@/lib/query-factory';
import { nicknameMaxLength } from '@/lib/regex-patterns';
import { useNicknameChange, useProfileChange } from '@/mutations/users';
import {
  StyledAvartarWrapper,
  StyledRenameWrapper,
} from '@/pages/my/rename.style';

export default function Rename() {
  const { data: user } = useQuery(userQueries.detail());
  useSetHeader({ title: '프로필 수정', rightBtn: false });
  const { mutate: changeNicknameMutate, isPending } = useNicknameChange(true);
  const { mutate: changeProfileMutate } = useProfileChange();
  const { handleNameChange, handleNameReset, isError, name, nameRef } =
    useNameForm('nickname');
  const handleNicknameChange = () => {
    changeNicknameMutate(name);
  };

  const handleProfileChange = () => {
    if (user?.isOriginProfile === 'N') return;
    changeProfileMutate();
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
      <ReactHelmet title="프로필 수정 - 마니또" />
    </StyledRenameWrapper>
  );
}
