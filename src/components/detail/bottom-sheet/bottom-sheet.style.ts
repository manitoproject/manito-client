import styled from '@emotion/styled';

import { BottomSheetProps } from './bottom-sheet';

type BottomSheetType = Pick<BottomSheetProps, 'isOpen'> & { height?: number };
export const StyledBottomSheet = styled.div<BottomSheetType>`
  position: fixed;
  border-top: 1px solid ${(props) => props.theme.colors.gray[300]};
  bottom: ${({ isOpen, height }) => (isOpen ? '0' : `-${height}px`)};
  transition: bottom 300ms ease-out;
  max-width: ${(props) => props.theme.sizes.mobile};
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transform: ${(props) => `translateX(-${props.theme.sizes.padding})`};
  padding: 16px 24px;
  background-color: ${(props) => props.theme.colors.white};
`;

export const StyledBottomSheetHeader = styled.div`
  display: flex;
  justify-content: center;
  button {
    width: 66px;
    height: 2px;
    background-color: ${(props) => props.theme.colors.black};
  }
`;
