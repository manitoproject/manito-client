import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { EditSquare } from '@/assets/svg/icons';
import CakeSwipe from '@/components/cake/swipe';
import DetailHeader from '@/components/rollingpaper/list/header/detail-header';
import { CAKE_THEME_PALETTES } from '@/constants/cake-decoration';
import ReactHelmet, { TITLE } from '@/helmet';
import useSetHeader from '@/hooks/set-header';
import { usePaperMessagesQuery } from '@/queries/message';
import { usePaperDetailQuery } from '@/queries/paper';
import routes from '@/routes';
import {
  StyledListWrapper,
  StyledRollingList,
} from '@/routes/rollingpaper/list.style';
import { useMessageActions } from '@/stores/message-store';
import { useToastActions } from '@/stores/toast-store';

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
    bg: CAKE_THEME_PALETTES[activeIndex].headerColor,
    color: 'white',
  });
  const handleWrite = () => {
    if (MessageData && MessageData.length >= 39) {
      return add('작성할 수 있는 공간이 없습니다.');
    }
    navigate(routes.cake.decorate(), { state: { id: data?.data?.id } });
    setInfo({
      bg: CAKE_THEME_PALETTES[activeIndex].bgUrl,
      position: MessageData?.length,
    });
  };

  return (
    <StyledRollingList>
      <StyledListWrapper>
        <DetailHeader paperId={paper?.id} content="cake" />
      </StyledListWrapper>
      <CakeSwipe activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      <StyledWriteButton
        onClick={handleWrite}
        bg={CAKE_THEME_PALETTES[activeIndex].btnColor}
      >
        <EditSquare width={40} height={40} fill="#fff" />
      </StyledWriteButton>
      <ReactHelmet title={`${data?.data?.title} - ${TITLE}`} />
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
