import styled from '@emotion/styled';
import { Suspense } from 'react';
import { Link } from 'react-router-dom';

import {
  MainBanner,
  MakeCakeBadge,
  RollingBadge,
  TreasureBadge,
} from '@/assets/imgs';
import Greeting from '@/components/home/greeting';
import { GreetingSkeleton } from '@/components/skeletons/skeletons';
import ReactHelmet from '@/helmet';
import useSetHeader from '@/hooks/set-header';
import routes from '@/routes';

const CONTENTS = [
  {
    name: '롤링 페이퍼',
    isActive: true,
    href: () => routes.setupIntro('rollingpaper'),
    badge: RollingBadge,
  },
  {
    name: '케이크 만들기',
    isActive: true,
    href: () => routes.setupIntro('cake'),
    badge: MakeCakeBadge,
  },
  {
    name: '추억의 보물상자',
    isActive: false,
    href: () => '',
    badge: TreasureBadge,
  },
];

export default function Home() {
  useSetHeader({ title: '메인 페이지' });

  return (
    <StyledWrapper>
      <section>
        <Suspense fallback={<GreetingSkeleton />}>
          <Greeting />
        </Suspense>
        <StyeldBanner>
          <img src={MainBanner} alt="메인 배너" />
        </StyeldBanner>
        <StyeldContents>
          {CONTENTS.map((content) => {
            return (
              <StyledContentItem
                hasBorder={content.name === '롤링 페이퍼'}
                key={content.name}
              >
                {content.isActive ? (
                  <Link to={content.href()}>
                    <img src={content.badge} alt={content.name} />
                  </Link>
                ) : (
                  <img src={content.badge} alt={content.name} />
                )}
              </StyledContentItem>
            );
          })}
        </StyeldContents>
      </section>
      <ReactHelmet title="메인페이지 - 마니또" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  section {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
`;

const StyeldBanner = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 4px;
  height: 96px;
`;
const StyeldContents = styled.ul`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);
`;
const StyledContentItem = styled.li<{ hasBorder: boolean }>`
  border-radius: 10px;
  overflow: hidden;
  border: ${({ hasBorder, theme }) =>
    hasBorder && `1px solid ${theme.colors['gray-300']}`};
  a,
  img {
    svg {
      width: 100%;
      height: 100%;
    }
  }
`;
