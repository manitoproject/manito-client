import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { AddCircle } from '../../assets/svg/icons';

type Emoji = {
  id: number;
  template: string;
};

interface LetterItemProps {
  onLetterClick: () => void;
  isActive: boolean;
  emoji: Emoji | null;
}
export default function LetterItem({
  onLetterClick,
  isActive,
  emoji,
}: LetterItemProps) {
  const Emoji = emoji?.template;
  return (
    <StyledItem isActive={isActive}>
      <button type="button" onClick={onLetterClick}>
        {Emoji ? <Emoji /> : <AddCircle />}
      </button>
    </StyledItem>
  );
}

const StyledItem = styled.li<Pick<LetterItemProps, 'isActive'>>`
  border: ${({ isActive, theme }) =>
    isActive ? 'none' : `1px dashed ${theme.colors.white}`};
  background: ${({ isActive }) =>
    isActive ? 'none' : `rgba(249, 249, 249, 0.5)`};
  border-radius: 4px;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    svg {
      ${({ isActive }) => css`
        width: ${isActive ? '100%' : 'auto'};
        height: ${isActive ? '100%' : 'auto'};
      `}
    }
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
`;
