import styled from '@emotion/styled';

import useOutsideClick from '../../hooks/useOutsideClick';
import emojis, { EmojiKey } from '../../lib/emoji-map';
import { Button } from '../common/buttons';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onActiveEmojiChange: (i: number) => void;
  activeEmojiIndex: number | null;
}
const data: { ['theme']: EmojiKey } = {
  theme: 'space',
};

export default function BottomSheet({
  isOpen,
  onClose,
  onActiveEmojiChange,
  activeEmojiIndex,
}: BottomSheetProps) {
  const ref = useOutsideClick(onClose, isOpen);

  return (
    <StyledBottomSheet ref={ref} isOpen={isOpen}>
      <StyledBottomSheetHeader>
        <button />
      </StyledBottomSheetHeader>
      <StyledBottomSheetContent>
        {emojis[data.theme].map((emoji, i) => {
          const Svg = emoji.svg;
          return (
            <StyledBottomSheetContentButton
              isActive={activeEmojiIndex === i}
              key={emoji.name}
              type="button"
              onClick={() => onActiveEmojiChange(i)}
            >
              <Svg />
            </StyledBottomSheetContentButton>
          );
        })}
      </StyledBottomSheetContent>
      <Button disabled={typeof activeEmojiIndex !== 'number'}>
        이모지 선택하기
      </Button>
    </StyledBottomSheet>
  );
}

const StyledBottomSheet = styled.div<Pick<BottomSheetProps, 'isOpen'>>`
  position: fixed;
  border-top: 1px solid ${(props) => props.theme.colors.gray[300]};
  bottom: ${(props) => (props.isOpen ? '0' : '-376.5px')};
  transition: bottom 300ms ease;
  max-width: ${(props) => props.theme.sizes.mobile};
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transform: ${(props) => `translateX(-${props.theme.sizes.padding})`};
  padding: 16px 24px;
  background-color: ${(props) => props.theme.colors.white};
`;

const StyledBottomSheetHeader = styled.div`
  display: flex;
  justify-content: center;
  button {
    width: 66px;
    height: 2px;
    background-color: ${(props) => props.theme.colors.black};
  }
`;

const StyledBottomSheetContent = styled.div`
  display: grid;
  gap: 10px 16px;
  grid-template-columns: repeat(4, 1fr);
`;
const StyledBottomSheetContentButton = styled.button<{ isActive: boolean }>`
  border: ${({ isActive, theme }) =>
    isActive ? `1px dashed ${theme.colors.powderBlue[900]}` : 'none'};
  padding: 0;
  svg {
    width: 100%;
    height: 100%;
  }
  aspect-ratio: 1;
  border-radius: 4px;
`;
