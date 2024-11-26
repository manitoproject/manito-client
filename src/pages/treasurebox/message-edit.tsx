import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { TreasureStartBg } from '@/assets/imgs';
import { Button } from '@/components/common/buttons/buttons';
import TreasureBoxTextarea from '@/components/treasurebox/textarea';
import TreasureTopDisplay from '@/components/treasurebox/top-title';
import ReactHelmet from '@/helmet';
import useSetHeader from '@/hooks/use-set-header';
import { messageQueries } from '@/lib/query-factory';
import { useEditMessage } from '@/mutations/message';
import { StyledBackdrop } from '@/pages/rollingpaper/list.style';
import { StyledContentOverlay } from '@/styles/styled';

export default function TreasureBoxMessageEdit() {
  const params = useParams();
  const location = useLocation();
  const { data: messages } = useQuery(messageQueries.paper(Number(params.id)));
  const currentMessage = messages?.find(
    (message) => message.id === location.state.id,
  );
  const [value, setValue] = useState(currentMessage?.content ?? '');
  const { mutate } = useEditMessage({
    content: 'treasurebox',
    paperId: Number(params.id),
    messageId: currentMessage?.id,
  });
  useSetHeader({
    title: '메시지 수정',
    bg: 'treasure-teal-700',
    color: 'white',
    font: 'Cafe24Ohsquare',
    rightBtn: false,
  });

  return (
    <StyledMessageCreateWrapper>
      <TreasureTopDisplay treasure={currentMessage?.theme} />
      <StyledForm>
        <TreasureBoxTextarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </StyledForm>
      <Button
        onClick={() =>
          mutate({
            content: value,
            id: location.state.id,
            font: 'Cafe24Ohsquare',
            fontColor: 'brown-700',
          })
        }
        font="Cafe24Ohsquare"
        disabled={!value.length}
      >
        수정완료
      </Button>
      <StyledBackdrop bg={TreasureStartBg} />
      <StyledContentOverlay opacity={40} />
      <ReactHelmet title={`메시지 수정 - 마니또`} />
    </StyledMessageCreateWrapper>
  );
}
const StyledMessageCreateWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  button {
    margin-top: auto;
    z-index: 50;
  }
`;

const StyledForm = styled.div`
  z-index: 50;
`;
