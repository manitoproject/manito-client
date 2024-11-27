import styled from '@emotion/styled';

import { findTreasureByName } from '@/lib/treasure-box';
import { getFontSizeAndWeight } from '@/styles/mixins';

interface TreasureBoxTopTitleProps {
  treasure: string | undefined;
}

export default function TreasureBoxTopTitle({
  treasure,
}: TreasureBoxTopTitleProps) {
  const activeTreasure = findTreasureByName(treasure);
  return (
    <StyledTreasureDisplay>
      {activeTreasure && (
        <>
          <activeTreasure.svg />
          <div>
            <h2>{activeTreasure.title}</h2>
            <p>{activeTreasure.desc}</p>
          </div>
        </>
      )}
    </StyledTreasureDisplay>
  );
}
const StyledTreasureDisplay = styled.div`
  height: 206px;
  position: relative;
  z-index: 50;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  gap: 24px;
  svg {
    width: 70%;
  }
  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    h2 {
      text-align: center;
      padding: 8px 0;
      font-family: ${({ theme }) => theme.fontFamily.Cafe24Ohsquare};
      border-radius: 99px;
      border: 2px solid var(--color-teal-teal500, #19807a);
      background: var(--color-teal-teal300, #7abaab);
      box-shadow: 2px 2px 8px 0px #19807a inset;
      ${getFontSizeAndWeight('heading1', 'bold')}
    }
    p {
      font-size: 16px;
      font-weight: 500;
      font-family: ${({ theme }) => theme.fontFamily.SpoqaHanSansNeo};
    }
  }
`;
