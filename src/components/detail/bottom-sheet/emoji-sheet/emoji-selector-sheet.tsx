import styled from '@emotion/styled';

import emojis from '../../../../lib/emoji-map';
import { ThemeKey } from '../../../../lib/theme-map';

interface EmojiContentProps {
  activeEmojiIndex: number | null;
  onActiveEmojiChange: (i: number) => void;
  theme: ThemeKey;
}

export default function EmojiSelectorSheet({
  activeEmojiIndex,
  onActiveEmojiChange,
  theme,
}: EmojiContentProps) {
  return (
    <StyledWrapper>
      {emojis[theme].map((emoji, i) => {
        const Emoji = emoji.svg;
        return (
          <StyledItem
            isActive={activeEmojiIndex === i}
            key={emoji.name}
            type="button"
            onClick={() => onActiveEmojiChange(i)}
          >
            <Emoji />
          </StyledItem>
        );
      })}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: grid;
  gap: 10px 16px;
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
