import styled from '@emotion/styled';

import {
  CAKE_THEME_STYLES,
  DecorationType,
  MAKECAKE_EMOJI_MAP,
} from '@/lib/cake-decoration';
import { ColorName } from '@/styles/theme';

interface MakeCakeDecorationListProps {
  activeTab: DecorationType;
  setActiveDeco: React.Dispatch<React.SetStateAction<string>>;
  activeDeco: string;
}

export default function MakeCakeDecorationList({
  activeTab,
  setActiveDeco,
  activeDeco,
}: MakeCakeDecorationListProps) {
  const theme = CAKE_THEME_STYLES.find(
    (cakeTheme) => cakeTheme.id === activeTab,
  );

  if (!theme) return null;
  return (
    <StyledList>
      {MAKECAKE_EMOJI_MAP[activeTab].map((deco) => (
        <StyledItemButton
          isActive={activeDeco === deco.name}
          bg={theme.bgColor}
          border={theme.fontColor}
          key={deco.name}
          type="button"
          onClick={() => setActiveDeco(deco.name)}
        >
          <img src={deco.imgUrl} alt={deco.name} />
        </StyledItemButton>
      ))}
    </StyledList>
  );
}

const StyledList = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;
const StyledItemButton = styled.button<{
  isActive: boolean;
  bg: ColorName;
  border: ColorName;
}>`
  img {
    width: 100%;
    height: 100%;
  }
  background-color: ${({ theme, bg }) => theme.colors[bg]};
  display: flex;
  outline: ${({ isActive, theme, border }) =>
    isActive && `1px dashed ${theme.colors[border]}`};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;
