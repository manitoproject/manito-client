import styled from '@emotion/styled';

import {
  CAKE_DECORATIONS,
  CAKE_THEME_STYLES,
  DecorationType,
} from '@/lib/cake-decoration';
import { ColorName } from '@/styles/theme';

interface DecorationsProps {
  activeTab: DecorationType;
  setActiveDeco: React.Dispatch<React.SetStateAction<string>>;
  activeDeco: string;
}

export default function Decorations({
  activeTab,
  setActiveDeco,
  activeDeco,
}: DecorationsProps) {
  const theme = CAKE_THEME_STYLES.find(
    (cakeTheme) => cakeTheme.labelEng === activeTab,
  );

  if (!theme) return null;
  return (
    <StyledDecoItem>
      {CAKE_DECORATIONS[activeTab].map((deco) => (
        <StyledButton
          isActive={activeDeco === deco.name}
          bg={theme.bgColor}
          border={theme.fontColor}
          key={deco.name}
          type="button"
          onClick={() => setActiveDeco(deco.name)}
        >
          <deco.svg />
        </StyledButton>
      ))}
    </StyledDecoItem>
  );
}

const StyledDecoItem = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;
const StyledButton = styled.button<{
  isActive: boolean;
  bg: ColorName;
  border: ColorName;
}>`
  background-color: ${({ theme, bg }) => theme.colors[bg]};
  display: flex;
  outline: ${({ isActive, theme, border }) =>
    isActive && `1px dashed ${theme.colors[border]}`};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  max-width: 96px;
  width: 100%;
  height: 100%;
  max-height: 96px;
`;
