import styled from '@emotion/styled';
import { useState } from 'react';

import MyInfo from '../components/my/info';
import PageMenu from '../components/my/menu/page-menu';
import PaperMenu from '../components/my/menu/paper-menu';
import MyMessageList from '../components/my/message/list';
import MyPaperList from '../components/my/paper/list';

export default function My() {
  const [activePaperMenuIndex, setActivePaperMenuIndex] = useState(0);
  const [activePageMenuIndex, setActivePageMenuIndex] = useState(0);

  return (
    <StyledWrapper>
      <MyInfo />
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
