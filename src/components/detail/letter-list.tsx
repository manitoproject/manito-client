import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import emojis from '../../lib/emoji-map';
import { ThemeKey } from '../../lib/theme-map';
import LetterItem from './letter-item';

interface RollingListProps {
  onBottomSheetOpen: (status: boolean) => void;
  activeEmojiIndex: number | null;
  setActiveEmojiIndex: React.Dispatch<React.SetStateAction<number | null>>;
}
const theme: { ['theme']: ThemeKey } = {
  theme: 'space',
};

export default function LetterList({
  onBottomSheetOpen,
  activeEmojiIndex,
  setActiveEmojiIndex,
}: RollingListProps) {
  const [activeLetterIndex, setActiveLetterIndex] = useState<null | number>(
    null,
  );
  const [data, setData] = useState<
    Array<null | { id: number; template: string }>
  >([null, null, null, null, null, null, null, null]);

  const handleLetterClick = (i: number) => {
    if (activeEmojiIndex) setActiveEmojiIndex(null);
    setActiveLetterIndex(i);
    onBottomSheetOpen(true);
  };

  useEffect(() => {
    if (activeEmojiIndex !== null) {
      setData((oldData) =>
        oldData.map((prev, i) => {
          if (i === activeLetterIndex) {
            return {
              id: 1,
              template: emojis[theme.theme][activeEmojiIndex].svg,
            };
          } else {
            return prev;
          }
        }),
      );
    }
  }, [activeLetterIndex, activeEmojiIndex]);

  return (
    <StyledList>
      {data.map((emoji, i) => (
        <LetterItem
          key={i}
          isActive={
            activeLetterIndex === i && typeof activeEmojiIndex === 'number'
          }
          emoji={emoji}
          onLetterClick={() => handleLetterClick(i)}
        />
      ))}
    </StyledList>
  );
}

const StyledList = styled.ul`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);
`;
