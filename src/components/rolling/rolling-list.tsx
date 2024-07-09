import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { AddCircle } from '../../assets/svg';
import emojis, { EmojiKey } from '../../lib/emoji-map';

interface RollingListProps {
  onBottomSheetOpen: (status: boolean) => void;
  activeEmojiIndex: number | null;
}
const theme: { ['theme']: EmojiKey } = {
  theme: 'space',
};

export default function RollingList({
  onBottomSheetOpen,
  activeEmojiIndex,
}: RollingListProps) {
  const [data, setData] = useState<
    Array<null | { id: number; template: string }>
  >([null, null, null, null, null, null, null, null]);

  useEffect(() => {
    if (activeEmojiIndex !== null) {
      setData((oldData) =>
        oldData.map((prev, i) => {
          if (i === activeEmojiIndex) {
            return {
              id: 1,
              template: emojis[theme.theme][i].svg,
            };
          } else {
            return prev;
          }
        }),
      );
    }
  }, [activeEmojiIndex]);

  return (
    <StyledList>
      {data.map((emoji, i) => {
        const Emoji = emoji?.template;
        return (
          <StyledItem key={i} isActive={activeEmojiIndex === i}>
            <button type="button" onClick={() => onBottomSheetOpen(true)}>
              {Emoji ? <Emoji /> : <AddCircle />}
            </button>
          </StyledItem>
        );
      })}
    </StyledList>
  );
}

const StyledList = styled.ul`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);
`;

const StyledItem = styled.li<{ isActive: boolean }>`
  border-radius: 4px;
  border: 1px dashed var(--color-gray-white, #fff);
  background: rgba(249, 249, 249, 0.5);
  display: flex;
  justify-content: center;
  padding: 0;
  align-items: center;
  aspect-ratio: 1;
  button {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
`;
