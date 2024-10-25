import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ChocolateBgOriginal,
  StrawberryBgOriginal,
  VanillaBgOriginal,
} from '@/assets/imgs';
import { EditSquare } from '@/assets/svg/icons';
import CakeSwipe from '@/components/cake/swipe';
import DetailHeader from '@/components/rollingpaper/list/header/detail-header';
import { useSetHeader } from '@/hooks';
import { usePaperDetailQuery } from '@/queries/paper';
import routes from '@/routes';
import {
  StyledListWrapper,
  StyledRollingList,
} from '@/routes/rollingpaper/list.style';
import { useCakeMessageActions } from '@/stores/cake-message-store';
import { ColorName } from '@/styles/theme';

export const THEME_PALETTES: Array<{
  btnColor: string;
  bgUrl: string;
  headerColor: ColorName;
}> = [
  { btnColor: '#F9BBC8', bgUrl: StrawberryBgOriginal, headerColor: 'pink-300' },
  {
    btnColor: '#74342A',
    bgUrl: ChocolateBgOriginal,
    headerColor: 'chocolate-300',
  },
  { btnColor: '#FE7D3F', bgUrl: VanillaBgOriginal, headerColor: 'vanilla-300' },
];

const POSITION = 0;
export default function CakeList() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const { setInfo } = useCakeMessageActions();
  const { data } = usePaperDetailQuery();
  const paper = data?.data;

  useSetHeader({
    title: paper?.title,
    bg: THEME_PALETTES[activeIndex].headerColor,
    color: 'white',
  });

  const handleWrite = () => {
    navigate(routes.cake.decorate(), {
      state: { id: data?.data?.id },
    });
    setInfo({
      bg: THEME_PALETTES[activeIndex].bgUrl,
      position: POSITION,
    });
  };

  return (
    <StyledRollingList>
      <StyledListWrapper>
        <DetailHeader paperId={paper?.id} />
      </StyledListWrapper>
      <CakeSwipe activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      <StyledWriteButton
        onClick={handleWrite}
        bg={THEME_PALETTES[activeIndex].btnColor}
      >
        <EditSquare width={40} height={40} fill="#fff" />
      </StyledWriteButton>
    </StyledRollingList>
  );
}

const StyledWriteButton = styled.button<{ bg: string }>`
  z-index: 50;
  padding: 10px;
  border-radius: 8px;
  background-color: ${({ bg }) => bg};
  width: fit-content;
  position: absolute;
  right: 0;
  bottom: 0;
`;
