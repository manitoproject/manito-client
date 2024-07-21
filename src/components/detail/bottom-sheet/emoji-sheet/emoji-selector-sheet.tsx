import styled from '@emotion/styled';

import emojis from '../../../../constants/emojis';
import { ThemeKey } from '../../../../constants/theme-list';
import messageStore from '../../../../stores/messageStore';

interface EmojiContentProps {
  theme?: ThemeKey;
}

export default function EmojiSelectorSheet({ theme }: EmojiContentProps) {
  const { setActiveEmojiIndex, activeEmojiIndex, addList } = messageStore();

  return (
    <StyledWrapper>
      {theme &&
        emojis[theme].map((emoji, i) => {
          const Emoji = emoji.svg;
          return (
            <StyledItem
              isActive={activeEmojiIndex === i}
              key={emoji.name}
              type="button"
              onClick={() => {
                setActiveEmojiIndex(i);
                if (activeEmojiIndex !== i) addList(theme);
              }}
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
