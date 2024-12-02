import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { TreasureTutorialBg } from '@/assets/imgs';
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
      <StyledStoryWrapper
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p>
          마음의 보물상자에
          <br />
          오신걸 환영합니다.
        </p>
        <p>
          그 동안 전하지 못한
          <br />
          진심과 마음을
          <br />
          전달해보세요.
        </p>
        <img src={TreasureTutorialBg} alt="TreasureTutorialBg" />
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
  flex-direction: column;
  justify-content: center;
  button {
    margin-top: auto;
    z-index: 50;
  }
`;

const StyledStoryWrapper = styled(motion.div)`
  display: flex;
  height: 100%;
  position: relative;
  img {
    height: 650px;
    width: 100%;
    z-index: 0;
    position: absolute;
  }
  ${getFontSizeAndWeight('heading2', 'bold')}
  width: 100%;
  justify-content: center;
  flex-direction: column;
  p:nth-of-type(2) {
    margin-top: 80px;
  }
  p {
    position: relative;
    z-index: 1;
    color: ${({ theme }) => theme.colors['treasure-teal-700']};
    text-align: center;
    font-family: ${({ theme }) => theme.fontFamily.Cafe24Ohsquare};
  }
`;
