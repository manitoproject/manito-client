import styled from '@emotion/styled';

import emojis from '../../../../constants/emojis';
import useMessageStore from '../../../../stores/message-store';

interface EmojiContentProps {
  theme?: RollingThemeName;
}

export default function EmojiSelectorSheet({ theme }: EmojiContentProps) {
  const { setActiveEmojiName, activeEmojiName, addList } = useMessageStore();

  return (
    <StyledWrapper>
      {theme &&
        emojis[theme].map((emoji) => (
          <StyledItem
            isActive={activeEmojiName === emoji.name}
            key={emoji.name}
            type="button"
            onClick={() => {
              setActiveEmojiName(emoji.name);
              if (activeEmojiName !== emoji.name) addList(theme);
            }}
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
