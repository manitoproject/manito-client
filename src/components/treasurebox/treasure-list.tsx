import styled from '@emotion/styled';

import { Button } from '@/components/common/buttons/buttons';
import { Treasure, TREASURESBOX_EMOJI_MAP } from '@/lib/treasure-box';
import { getFontSizeAndWeight } from '@/styles/mixins';

interface TreasureBoxListProps {
  onTreauseClick: (treasureId: Treasure) => void;
  selectedTreasureName: Treasure | undefined;
  onChangePage: (page: 'select' | 'write') => void;
}

export default function TreasureBoxList({
  selectedTreasureName,
  onTreauseClick,
  onChangePage,
}: TreasureBoxListProps) {
  return (
    <StyledWrapper>
      <div />
      <StyledList>
        {TREASURESBOX_EMOJI_MAP.map((treasure) => {
          return (
            <StyledItemBtn
              isActive={selectedTreasureName === treasure.name}
              onClick={() => onTreauseClick(treasure.name)}
              key={treasure.name}
            >
              <img src={treasure.imgUrl} alt={treasure.name} />
              <span>{treasure.title}</span>
            </StyledItemBtn>
          );
        })}
      </StyledList>
      <Button
        onClick={() => onChangePage('write')}
        font="Cafe24Ohsquare"
        disabled={!selectedTreasureName}
      >
        선택하기
      </Button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  z-index: 50;
  position: relative;
  width: 100%;
  div:first-of-type {
    width: calc(100% + 48px);
    transform: ${({ theme }) =>
      `translate(-${theme.sizes.padding},${theme.sizes.paddingBottom})`};
    height: 12px;
    background: var(--color-teal-teal700, #386663);
    box-shadow: 2px 2px 8px 0px var(--color-teal-teal100, #c7e1d9) inset;
  }
  & > button {
    @media (max-width: 480px) {
      max-width: calc(100% - 48px);
    }
    @media (min-width: 480px) {
      max-width: ${({ theme }) => `calc(${theme.sizes.mobile} - 48px)`};
    }
    width: 100%;
    bottom: 40.5px;
    position: fixed;
  }
`;

const StyledList = styled.div`
  display: grid;
  gap: 29px 18px;
  grid-template-columns: repeat(3, 1fr);
  transform: ${({ theme }) =>
    `translate(-${theme.sizes.padding}, ${theme.sizes.paddingBottom})`};
  width: calc(100% + 48px);
  position: relative;
  bottom: 0;
  padding: 20px 24px 140px;
  background: linear-gradient(
    180deg,
    rgba(238, 238, 238, 0.8) 0%,
    rgba(25, 128, 122, 0.8) 100%
  );
`;

const StyledItemBtn = styled.button<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  padding: ${({ isActive }) => (isActive ? '14px ' : '16px')};
  gap: 6px;
  border-radius: 8px;
  background: ${({ isActive, theme }) =>
    isActive
      ? `radial-gradient(50% 50% at 50% 50%, #c7e1d9 0%, #386663 100%)
      padding-box, linear-gradient(#fff, ${theme.colors['mint-600']}) border-box`
      : 'var(--color-teal-teal100, #c7e1d9)'};
  border: ${({ isActive }) => `${isActive ? '3px solid transparent' : 'none'}`};
  box-shadow: 0px 0px 32px 0px var(--color-teal-teal700, #386663) inset;
  outline-offset: -2px;
  img {
    width: 100%;
    height: 100%;
  }
  span {
    text-shadow: 0px 4px 4px var(--color-teal-teal700, #386663);
    justify-content: center;
    display: flex;
    width: 100%;
    font-family: ${({ theme }) => theme.fontFamily.Cafe24Ohsquare};
    ${getFontSizeAndWeight('body1', 'bold')}
    padding: 8px 12px;
    border-radius: 99px;
    border: 2px solid var(--color-teal-teal700, #386663);
    background: var(--color-teal-teal300, #7abaab);
    color: ${({ theme }) => theme.colors.white};
    box-shadow: 2px 2px 8px 0px var(--color-teal-teal700, #386663) inset;
  }
`;
