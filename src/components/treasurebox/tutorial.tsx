import styled from '@emotion/styled';

import { Button } from '@/components/common/buttons/buttons';
import { getFontSizeAndWeight } from '@/styles/mixins';

interface TreasureBoxTutorialProps {
  onNextPage: () => void;
}

export default function TreasureBoxTutorial({
  onNextPage,
}: TreasureBoxTutorialProps) {
  return (
    <StyledTutorialWrapper>
      <StyledStoryWrapper>
        <StyledStory>
          마음의 보물상자에
          <br />
          오신걸 환영합니다.
        </StyledStory>
        <StyledStory>
          그 동안 친구에게 전하지
          <br />
          못한 진심과 위로를
          <br />
          마음의 보물상자를 통해
          <br />
          전달해보세요.
        </StyledStory>
      </StyledStoryWrapper>
      <Button font="Cafe24Ohsquare" onClick={onNextPage}>
        다음
      </Button>
    </StyledTutorialWrapper>
  );
}

const StyledTutorialWrapper = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  position: relative;
  display: flex;
  button {
    margin-top: auto;
    z-index: 50;
  }
`;

const StyledStoryWrapper = styled.div`
  display: flex;
  ${getFontSizeAndWeight('heading2', 'bold')}
  position: absolute;
  width: 100%;
  gap: 50px;
  height: 100%;
  justify-content: center;
  flex-direction: column;
`;

const StyledStory = styled.p`
  color: ${({ theme }) => theme.colors['treasure-teal-700']};
  text-align: center;
  font-family: ${({ theme }) => theme.fontFamily.Cafe24Ohsquare};
`;
