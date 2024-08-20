import styled from '@emotion/styled';

interface BottomSheetheaderProps {
  onOpen?: () => void;
}

export default function BottomSheetheader({ onOpen }: BottomSheetheaderProps) {
  return (
    <StyledWrapper type="button" onClick={onOpen}>
      <div />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.button`
  display: flex;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  div {
    border-radius: 999999999px;
    width: 66px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors['gray-800']};
  }
  padding: 19px 0;
`;
