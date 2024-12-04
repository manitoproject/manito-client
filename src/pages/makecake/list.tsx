import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import { EditSquare } from '@/assets/svg/icons';
import ListHeader from '@/components/list/header';
import MakeCakeDecorationButtons from '@/components/makecake/decoration-buttons';
import SwiperNavigation from '@/components/swiper/navigation';
import ReactHelmet, { TITLE } from '@/helmet';
import useSetHeader from '@/hooks/use-set-header';
import useSwiperNavigation from '@/hooks/use-swiper-navigation';
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
  const [swiper, setSwiper] = useState<SwiperClass>();
  const { data: messages } = useQuery(messageQueries.paper(Number(id)));
  const { data: paper } = useQuery(paperQueries.detail(Number(id)));
  const { data: user } = useQuery(userQueries.detail());
  const { activeIndex, onActiveIndexChange } = useSwiperNavigation(
    swiper,
    messages,
  );
  const toast = useToastActions();
  const loginModal = useLoginModalActions();

  useSetHeader({
    title: paper?.title,
    bg: CAKE_THEME_PALETTES[activeIndex].headerColor,
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
      <StyledSwiper
        onSlideChange={(e) => onActiveIndexChange(e.activeIndex)}
        resistanceRatio={0.1}
        onSwiper={setSwiper}
        modules={[Navigation]}
      >
        {CAKE_THEME_PALETTES.map((theme) => (
          <StyledSlide key={theme.bgUrl}>
            <StyledDecoList>
              <MakeCakeDecorationButtons activeIndex={activeIndex} />
              <img src={theme.cakeUrl} alt={theme.cakeUrl} />
            </StyledDecoList>

            <img src={theme.emptyBgUrl} alt={theme.emptyBgUrl} />
          </StyledSlide>
        ))}
        <SwiperNavigation />
      </StyledSwiper>
      <StyledWriteButton
        onClick={handleWrite}
        bgColor={CAKE_THEME_PALETTES[activeIndex].btnColor}
      >
        <EditSquare width={40} height={40} fill="#fff" />
      </StyledWriteButton>
      <ReactHelmet title={`${paper?.title} - ${TITLE}`} />
    </StyledListWrapper>
  );
}

const StyledSwiper = styled(Swiper)`
  position: absolute;
  top: ${({ theme }) => `-${theme.sizes.paddingTop}`};
  height: ${({ theme }) => `calc(100dvh - ${theme.sizes.header})`};
  transform: ${({ theme }) => `translateX(-${theme.sizes.padding})`};
  width: ${({ theme }) => theme.sizes.mobile};
  @media (max-width: 480px) {
    width: 100vw;
  }
`;

const StyledSlide = styled(SwiperSlide)`
  position: relative;
  & > img {
    top: 0;
    bottom: 0;
    position: absolute;
    z-index: 0;
  }
`;

const StyledDecoList = styled.div`
  position: relative;
  z-index: 50;
  width: 350px;
  left: 50%;
  top: 120px;
  transform: translateX(-50%);
  height: 550px;
  button {
    position: absolute;
    width: 66px;
    height: 66px;
  }
  img {
    width: 100%;
    height: 100%;
  }
`;
