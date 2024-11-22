import styled from '@emotion/styled';
import { Suspense, useState } from 'react';

import MyInfo from '@/components/my/info';
import ActivityTab from '@/components/my/menu/activity-tab';
import CategoryTab from '@/components/my/menu/category-tab';
import MyMessageList from '@/components/my/message/message-list';
import MyPaperList from '@/components/my/paper/paper-list';
import {
  MyMessageListSkeleton,
  MyPaperListSkeleton,
} from '@/components/skeletons/skeletons';
import ReactHelmet from '@/helmet';
import useSetHeader from '@/hooks/use-set-header';

export default function My() {
  const [activeActivityTabIndex, setActiveActivityTabIndex] = useState(0);
  const [activeCategoryTab, setActiveCategoryTab] =
    useState<RouteContentType>('rollingpaper');

  useSetHeader({ title: '마이 페이지' });

  return (
    <StyledWrapper>
      <MyInfo />
      <StyledContentsWrapper>
        <ActivityTab
          resetCategoryTab={() => setActiveCategoryTab('rollingpaper')}
          activeIndex={activeActivityTabIndex}
          setActiveIndex={setActiveActivityTabIndex}
        />
        <CategoryTab
          activeTab={activeCategoryTab}
          onChangeActiveTab={(tab: RouteContentType) =>
            setActiveCategoryTab(tab)
          }
        />
        {!activeActivityTabIndex ? (
          <Suspense fallback={<MyPaperListSkeleton />}>
            <MyPaperList activeCagegory={activeCategoryTab} />
          </Suspense>
        ) : (
          <Suspense fallback={<MyMessageListSkeleton />}>
            <MyMessageList activeCagegory={activeCategoryTab} />
          </Suspense>
        )}
      </StyledContentsWrapper>
      <ReactHelmet title="마이페이지 - 마니또" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledContentsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
