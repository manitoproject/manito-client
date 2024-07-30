// import { useRouteError } from 'react-router-dom';

import styled from '@emotion/styled';

import { Manito } from '../assets/svg/icons';

export default function ErrorPage() {
  // const error = useRouteError();
  // console.error(error);

  return (
    <StyledErrorWrapper>
      <div>
        <h1>MANITO ERROR</h1>
        <Manito />
        <p>
          페이지를 찾을 수 없습니다.
          <br />
          잘못된 주소를 입력하셨거나, 요청하신 페이지의 주소가
          <br />
          변경, 삭제되어 찾을 수 없습니다.
        </p>
      </div>
    </StyledErrorWrapper>
  );
}

const StyledErrorWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: ${({ theme }) => theme.colors['gray-100']};
  align-items: center;
  justify-content: center;
  div {
    height: 100%;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors['white']};
    width: ${({ theme }) => theme.sizes.mobile};
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 24px;
    h1 {
      font-family: ${({ theme }) => theme.fontFamily.Cafe24Ssurround};
      font-size: 32px;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.black};
    }

    p {
      line-height: 24px;
      text-align: center;
      font-size: 14px;
      color: ${({ theme }) => theme.colors['gray-700']};
    }
  }
`;
