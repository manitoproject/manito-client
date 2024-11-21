import styled from '@emotion/styled';
import { useRef } from 'react';

import BottomSheetheader from '@/components/bottom-sheet/header';
import { Button } from '@/components/common/buttons/buttons';

interface BottomSheetButton {
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
  onOpen: () => void;
  isOpen: boolean;
}

export default function BottomSheetButton({
  disabled,
  onClick,
  children,
  onOpen,
  isOpen,
}: BottomSheetButton) {
  const buttonRef = useRef<HTMLDivElement>(null);
  return (
    <StyledWrapper ref={buttonRef} isOpen={isOpen}>
      <BottomSheetheader onOpen={onOpen} />
      <Button onClick={onClick} disabled={disabled}>
        {children}
      </Button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div<{ isOpen: boolean }>`
  border-top: 1px solid var(--color-gray-gray300, #e0e0e0);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
  padding-left: 24px;
  padding-right: 24px;
  gap: 8px;
  display: flex;
  flex-direction: column;
  z-index: 50;
  position: fixed;
  max-width: ${(props) => props.theme.sizes.mobile};
  width: 100%;
  transition: bottom 150ms ease-out;
  bottom: ${({ isOpen }) => (isOpen ? 0 : `-154px`)};
  transform: ${({ theme }) => `translateX(-${theme.sizes.padding})`};
  background-color: ${({ theme }) => theme.colors.white};
  padding-bottom: 40px;
`;
