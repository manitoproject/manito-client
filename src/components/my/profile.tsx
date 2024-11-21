import styled from '@emotion/styled';
import { useSuspenseQuery } from '@tanstack/react-query';

import { kakaoProfile } from '@/assets/imgs';
import { userQueries } from '@/lib/query-factory';
import { getFontSizeAndWeight } from '@/styles/mixins';

export default function MyProfile() {
  const { data } = useSuspenseQuery(userQueries.detail());
  return (
    <>
      <StyledAvatarWrapper>
        <img
          src={
            data?.isOriginProfile === 'N' ? kakaoProfile : data?.profileImage
          }
          alt="avatar"
        />
      </StyledAvatarWrapper>
      <StyledNicknameWrapper>
        <p>{data?.nickname}</p>
        <p>{data?.email}</p>
      </StyledNicknameWrapper>
    </>
  );
}

const StyledNicknameWrapper = styled.div`
  flex: 1;
  display: flex;
  gap: 2px;
  justify-content: center;
  flex-direction: column;
  p:nth-of-type(1) {
    ${getFontSizeAndWeight('heading3', 'bold')}
    color: ${({ theme }) => theme.colors['gray-900']};
  }
  p:nth-of-type(2) {
    color: ${({ theme }) => theme.colors['gray-500']};
    ${getFontSizeAndWeight('body1', 'regular')}
  }
`;

const StyledAvatarWrapper = styled.div`
  img {
    border-radius: 999px;
    width: 48px;
    height: 48px;
  }
`;
