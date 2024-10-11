import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { useSetHeader } from '@/hooks';
import { useLogout } from '@/queries/users';
import routes from '@/routes';
import { getFontSizeAndWeight } from '@/styles/mixins';

export default function MySetting() {
  const { mutate } = useLogout();
  useSetHeader({ title: '설정' });

  return (
    <StyledWrapper>
      <StyledBackdrop />
      <StyledListWarpper>
        <div>내 정보</div>
        <StyledList>
          <StyledListItem>
            <Link to={routes.my.rename()}>내 프로필 수정</Link>
          </StyledListItem>
        </StyledList>
      </StyledListWarpper>
      <StyledListWarpper>
        <div>기타</div>
        <StyledList>
          <StyledListItem>
            <button type="button" onClick={() => mutate()}>
              로그아웃
            </button>
          </StyledListItem>
          <StyledListItem>
            <Link to={routes.my.contact()}>문의하기</Link>
          </StyledListItem>
        </StyledList>
      </StyledListWarpper>
    </StyledWrapper>
  );
}

const StyledBackdrop = styled.div`
  position: absolute;
  left: ${({ theme }) => `-${theme.sizes.padding}`};
  top: ${({ theme }) => `-${theme.sizes.header}`};
  width: ${({ theme }) => theme.sizes.mobile};
  height: 100vh;
  background-color: ${({ theme }) => theme.colors['powderBlue-100']};
`;

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledListWarpper = styled.div`
  z-index: 1;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 4px;
  & > div {
    ${getFontSizeAndWeight('heading2', 'bold')}
    padding: 0 16px;
  }
  background-color: ${({ theme }) => theme.colors.white};
`;

const StyledList = styled.ul``;
const StyledListItem = styled.li`
  color: ${({ theme }) => theme.colors['gray-800']};
  ${getFontSizeAndWeight('heading3', 'regular')}
  padding: 12px 16px;
  button,
  a {
    font-size: inherit;
    font-weight: inherit;
  }
  button {
    color: ${({ theme }) => theme.colors['gray-800']};
  }
`;
