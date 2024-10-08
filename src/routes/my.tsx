import styled from '@emotion/styled';
import { Suspense, useState } from 'react';

import MyInfo from '../components/my/info';
import ActivityTab from '../components/my/menu/activity-tab';
import CategoryTab from '../components/my/menu/category-tab';
import MyMessageList from '../components/my/message/message-list';
import MyPaperList from '../components/my/paper/paper-list';
import { MyMessageListSkeleton } from '../components/skeletons/skeletons';

const categoryList: Category[] = ['ROLLING_PAPER', 'CAKE', 'TREASURE'];

export default function My() {
  const [activeActivityTabIndex, setActiveActivityTabIndex] = useState(0);
  const [activeCategoryTabIndex, setActiveCategoryTabIndex] = useState(0);
  const activeCagegory: Category = categoryList[activeCategoryTabIndex];

  return (
    <StyledWrapper>
      <MyInfo />
      <StyledContentsWrapper>
        <ActivityTab
          resetCategoryTab={() => setActiveCategoryTabIndex(0)}
          activeIndex={activeActivityTabIndex}
          setActiveIndex={setActiveActivityTabIndex}
        />
        <CategoryTab
          activeIndex={activeCategoryTabIndex}
          setActiveIndex={setActiveCategoryTabIndex}
        />
        {!activeActivityTabIndex ? (
          <MyPaperList activeCagegory={activeCagegory} />
        ) : (
          <Suspense fallback={<MyMessageListSkeleton />}>
            <MyMessageList />
          </Suspense>
        )}
      </StyledContentsWrapper>
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
