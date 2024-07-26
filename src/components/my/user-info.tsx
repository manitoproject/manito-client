import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { Setting } from '../../assets/svg/icons';
import { useUserQuery } from '../../queries/users';
import { routes } from '../../router';
import { getFontSizeAndWeight } from '../../utils/style';

export default function UserInfo() {
  const { data } = useUserQuery();

  return (
    <StyledWrapper>
      <StyledAvatarWrapper>
        <img src={data?.data?.profileImage} alt="avatar" />
      </StyledAvatarWrapper>
      <StyledNicknameWrapper>
        <p>{data?.data?.nickname}</p>
        <p>{data?.data?.email}</p>
      </StyledNicknameWrapper>
      <StyledSvgWrapper>
        <Link to={routes.my.rename()}>
          <Setting />
        </Link>
      </StyledSvgWrapper>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.section`
  display: flex;
  gap: 8px;
  width: 100%;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0;
    border-bottom: 1px dashed ${(props) => props.theme.colors['gray-300']};
  }
  padding-bottom: 12px;
`;
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
const StyledSvgWrapper = styled.div`
  display: flex;
  align-items: center;
  a {
    padding: 4px;
  }
`;
