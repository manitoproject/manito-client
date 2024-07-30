import styled from '@emotion/styled';

import { Manito } from '../../assets/svg/icons';

interface ErrorProps {
  children: React.ReactNode;
}

export default function ErrorComponent({ children }: ErrorProps) {
  return (
    <StyledErrorWrapper>
      <div>
        <h1>MANITO ERROR</h1>
        <Manito />
        {children}
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
    width: 100%;
    padding: ${({ theme }) => `0 ${theme.sizes.padding}`};
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
      text-align: center;
    }

    p {
      line-height: 24px;
      text-align: center;
      font-size: 14px;
      color: ${({ theme }) => theme.colors['gray-700']};
    }
  }
`;
