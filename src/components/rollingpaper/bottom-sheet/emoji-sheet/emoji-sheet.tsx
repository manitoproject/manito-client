import styled from '@emotion/styled';
import React from 'react';

import emojis from '@/constants/emojis';

interface EmojiContentProps {
  theme: RollingThemeName;
  activeEmoji: string;
  setActiveEmoji: React.Dispatch<React.SetStateAction<string>>;
}

export default function EmojiSheet({
  theme,
  activeEmoji,
  setActiveEmoji,
}: EmojiContentProps) {
  const handleClick = (name: string) => {
    setActiveEmoji(name);
  };
  return (
    <StyledWrapper>
      {emojis[theme].map((emoji) => (
        <StyledItem
          isActive={activeEmoji === emoji.name}
          key={emoji.name}
          type="button"
          onClick={() => handleClick(emoji.name)}
        >
          <emoji.svg />
        </StyledItem>
      ))}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: grid;
  gap: 8px 16px;
  grid-template-columns: repeat(4, 1fr);
`;

const StyledItem = styled.button<{ isActive: boolean }>`
  outline: ${({ isActive, theme }) =>
    isActive ? `1px dashed ${theme.colors['powderBlue-900']}` : 'none'};
  padding: 0;
  svg {
    width: 100%;
    height: 100%;
  }
  aspect-ratio: 1;
  border-radius: 4px;
`;
