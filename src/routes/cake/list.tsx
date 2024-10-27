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
import { usePaperMessagesQuery } from '@/queries/message';
import { usePaperDetailQuery } from '@/queries/paper';
import routes from '@/routes';
import {
  StyledListWrapper,
  StyledRollingList,
} from '@/routes/rollingpaper/list.style';
import { useMessageActions } from '@/stores/message-store';
import { useToastActions } from '@/stores/toast-store';
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

export default function CakeList() {
  const { data: MessageData } = usePaperMessagesQuery();
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const { setInfo } = useMessageActions();
  const { data } = usePaperDetailQuery();
  const paper = data?.data;
  const { add } = useToastActions();

  useSetHeader({
    title: paper?.title,
    bg: THEME_PALETTES[activeIndex].headerColor,
    color: 'white',
  });

  const handleWrite = () => {
    if (MessageData?.data && MessageData.data.length >= 39) {
      return add('작성할 수 있는 공간이 없습니다.');
    }
    navigate(routes.cake.decorate(), { state: { id: data?.data?.id } });
    setInfo({
      bg: THEME_PALETTES[activeIndex].bgUrl,
      position: MessageData?.data?.length,
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
