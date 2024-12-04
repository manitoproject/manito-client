import styled from '@emotion/styled';

import TreasureBoxTextarea from '@/components/treasurebox/textarea';
import { findTreasureByName } from '@/lib/treasure-box';
import { getFontSizeAndWeight } from '@/styles/mixins';
import { Message } from '@/types/message';

interface SwipeTreasureSlideProps {
  message: Message<UserIdAndNickname>;
}

export default function TreasureBoxSlide({ message }: SwipeTreasureSlideProps) {
  const treasure = findTreasureByName(message.theme);
  return (
    <>
      <StyledSvgWrapper>
        <img src={treasure?.imgUrl} alt={treasure?.name} />
        <StyledTitleWrapper>
          <StyledTitle>{treasure?.title}</StyledTitle>
        </StyledTitleWrapper>
      </StyledSvgWrapper>
      <TreasureBoxTextarea value={message.content} />
    </>
  );
}

const StyledSvgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 203px;
    height: 203px;
  }
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 12px;
  align-items: center;
  flex-direction: column;
`;

const StyledTitle = styled.p`
  border-radius: 99px;
  padding: 8px 32px;
  width: fit-content;
  ${getFontSizeAndWeight('heading1', 'bold')};
  font-family: ${({ theme }) => theme.fontFamily.Cafe24Ohsquare};
  color: ${({ theme }) => theme.colors.white};
  text-shadow: 0px 4px 4px #19807a;
  border: 2px solid var(--color-teal-teal500, #19807a);
  background: var(--color-teal-teal300, #7abaab);
  box-shadow: 2px 2px 8px 0px #19807a inset;
`;
