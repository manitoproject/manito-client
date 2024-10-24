import styled from '@emotion/styled';

import { DECORATIONS, DecorationType } from '@/constants/cake-decoration';
import { ColorName } from '@/styles/theme';

interface DecorationsProps {
  activeTab: DecorationType;
  setActiveDeco: React.Dispatch<React.SetStateAction<string>>;
  activeDeco: string;
}

type DecorationColors = { bg: ColorName; border: ColorName };

const DECORATION_COLOR_MAP: Record<DecorationType, DecorationColors> = {
  chocolate: { bg: 'chocolate-100', border: 'chocolate-300' },
  vanilla: { bg: 'vanilla-100', border: 'vanilla-300' },
  strawberry: { bg: 'pink-100', border: 'pink-300' },
  white: { bg: 'gray-300', border: 'gray-800' },
};

export default function Decorations({
  activeTab,
  setActiveDeco,
  activeDeco,
}: DecorationsProps) {
  return (
    <StyledDecoItem>
      {DECORATIONS[activeTab].map((deco) => (
        <StyledButton
          isActive={activeDeco === deco.name}
          bg={DECORATION_COLOR_MAP[activeTab].bg}
          border={DECORATION_COLOR_MAP[activeTab].border}
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
  width: 96px;
  height: 96px;
`;
