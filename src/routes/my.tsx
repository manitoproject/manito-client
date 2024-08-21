import styled from '@emotion/styled';
import { Suspense, useState } from 'react';

import MyInfo from '../components/my/info';
import MyContentsTab from '../components/my/menu/contenst-tab';
import ThemeTab from '../components/my/menu/theme-tab';
import MyMessageList from '../components/my/message/message-list';
import MyPaperList from '../components/my/paper/paper-list';
import { MyMessageListSkeleton } from '../components/skeletons/skeletons';

export default function My() {
  const [activeContentTabIndex, setActiveContentTabIndex] = useState(0);

  return (
    <StyledWrapper>
      <MyInfo />
      <StyledContentsWrapper>
        <MyContentsTab
          activeIndex={activeContentTabIndex}
          onChangeIndex={setActiveContentTabIndex}
        />
        <ThemeTab />
        {!activeContentTabIndex ? (
          <MyPaperList />
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
