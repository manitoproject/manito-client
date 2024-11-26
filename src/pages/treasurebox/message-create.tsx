import styled from '@emotion/styled';
import { useState } from 'react';

import { TreasureStartBg } from '@/assets/imgs';
import TreasureMessageForm from '@/components/treasurebox/message-form';
import TreasureTopDisplay from '@/components/treasurebox/top-title';
import TreasureList from '@/components/treasurebox/treasure-list';
import ReactHelmet from '@/helmet';
import useSetHeader from '@/hooks/use-set-header';
import { Treasure } from '@/lib/treasure-box';
import { StyledBackdrop } from '@/pages/rollingpaper/list.style';
import { StyledContentOverlay } from '@/styles/styled';

export default function TreasureBoxMessageCreate() {
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
      <TreasureTopDisplay treasure={selectedTreasureName} />
      {activePage === 'select' ? (
        <TreasureList
          selectedTreasureName={selectedTreasureName}
          onChangePage={(page: 'select' | 'write') => setActivePage(page)}
          onTreauseClick={(treasureId: Treasure) =>
            setSelectedTreasureName(treasureId)
          }
        />
      ) : (
        <TreasureMessageForm selectedTreasureName={selectedTreasureName} />
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
