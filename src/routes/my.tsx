import styled from '@emotion/styled';
import { useState } from 'react';

import MyMessageList from '../components/my/my-message-list';
import MyPaperList from '../components/my/my-paper-list';
import PageMenu from '../components/my/page-menu';
import PaperMenu from '../components/my/paper-menu';
import UserInfo from '../components/my/user-info';

export default function My() {
  const [activePaperMenuIndex, setActivePaperMenuIndex] = useState(0);
  const [activePageMenuIndex, setActivePageMenuIndex] = useState(0);

  return (
    <StyledWrapper>
      <UserInfo />
      <StyledContentsWrapper>
        <PageMenu
          activePageMenuIndex={activePageMenuIndex}
          onActivePageMenuChange={(i: number) => setActivePageMenuIndex(i)}
        />
        <PaperMenu
          onActivePaperMenuIndex={activePaperMenuIndex}
          onActivePaperMenuChange={(i: number) => setActivePaperMenuIndex(i)}
        />
        {activePageMenuIndex === 0 ? <MyPaperList /> : <MyMessageList />}
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
