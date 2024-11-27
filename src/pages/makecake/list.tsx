import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { EditSquare } from '@/assets/svg/icons';
import ListHeader from '@/components/list/header';
import MakeCakeBgSwiper from '@/components/swiper/makecake-bg-swiper';
import ReactHelmet, { TITLE } from '@/helmet';
import useSetHeader from '@/hooks/use-set-header';
import { CAKE_THEME_PALETTES } from '@/lib/cake-decoration';
import { messageQueries, paperQueries, userQueries } from '@/lib/query-factory';
import {
  StyledListWrapper,
  StyledMessageTotal,
} from '@/pages/rollingpaper/list.style';
import routes from '@/routes';
import { useLoginModalActions } from '@/stores/login-modal-store';
import { useToastActions } from '@/stores/toast-store';
import { StyledWriteButton } from '@/styles/styled';

export default function MakeCakeList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currnetPageIndex, setCurrnetPageIndex] = useState(0);
  const { data: messages } = useQuery(messageQueries.paper(Number(id)));
  const { data: paper } = useQuery(paperQueries.detail(Number(id)));
  const { data: user } = useQuery(userQueries.detail());
  const toast = useToastActions();
  const loginModal = useLoginModalActions();

  useSetHeader({
    title: paper?.title,
    bg: CAKE_THEME_PALETTES[currnetPageIndex].headerColor,
    color: 'white',
  });

  const handleWrite = () => {
    if (!user) return loginModal.toggleOpen(true);
    if (messages && messages?.length === 39)
      return toast.add('작성할 수 있는 공간이 없습니다.');
    navigate(routes.makecake.decorate(), { state: { id: paper?.id } });
  };
  return (
    <StyledListWrapper>
      <ListHeader messageLength={messages?.length} content="makecake">
        <StyledMessageTotal>
          <span>{messages?.length}</span>
          개의 작성물
        </StyledMessageTotal>
      </ListHeader>
      <MakeCakeBgSwiper
        currnetPageIndex={currnetPageIndex}
        setCurrnetPageIndex={setCurrnetPageIndex}
      />
      <StyledWriteButton
        onClick={handleWrite}
        bgColor={CAKE_THEME_PALETTES[currnetPageIndex].btnColor}
      >
        <EditSquare width={40} height={40} fill="#fff" />
      </StyledWriteButton>
      <ReactHelmet title={`${paper?.title} - ${TITLE}`} />
    </StyledListWrapper>
  );
}
