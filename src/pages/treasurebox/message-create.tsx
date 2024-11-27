import styled from '@emotion/styled';
import { useState } from 'react';

import { TreasureStartBg } from '@/assets/imgs';
import TreasureBoxMessageForm from '@/components/treasurebox/message-form';
import TreasureBoxTopTitle from '@/components/treasurebox/top-title';
import TreasureBoxList from '@/components/treasurebox/treasure-list';
import ReactHelmet from '@/helmet';
import useSetHeader from '@/hooks/use-set-header';
import { Treasure } from '@/lib/treasure-box';
import { StyledBackdrop } from '@/pages/rollingpaper/list.style';
import { StyledContentOverlay } from '@/styles/styled';

export default function TreasureBoxCreateMessage() {
  const [selectedTreasureName, setSelectedTreasureName] = useState<Treasure>();
  const [activePage, setActivePage] = useState<'select' | 'write'>('select');

  useSetHeader({
    title: activePage == 'select' ? '보물선택' : '메시지 작성',
    bg: 'treasure-teal-700',
    color: 'white',
    font: 'Cafe24Ohsquare',
    rightBtn: false,
  });

  return (
    <StyledMessageCreateWrapper>
      <TreasureBoxTopTitle treasure={selectedTreasureName} />
      {activePage === 'select' ? (
        <TreasureBoxList
          selectedTreasureName={selectedTreasureName}
          onChangePage={(page: 'select' | 'write') => setActivePage(page)}
          onTreauseClick={(treasureId: Treasure) =>
            setSelectedTreasureName(treasureId)
          }
        />
      ) : (
        <TreasureBoxMessageForm selectedTreasureName={selectedTreasureName} />
      )}
      <StyledBackdrop bg={TreasureStartBg} />
      <StyledContentOverlay opacity={40} />
      <ReactHelmet title={`메시지 작성 - 마니또`} />
    </StyledMessageCreateWrapper>
  );
}

const StyledMessageCreateWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;
