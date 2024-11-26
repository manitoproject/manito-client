import styled from '@emotion/styled';
import { useState } from 'react';

import { Button } from '@/components/common/buttons/buttons';
import CreateMessageModal from '@/components/modal/create-message-modal';
import TreasureBoxTextarea from '@/components/treasurebox/textarea';
import { Treasure } from '@/lib/treasure-box';

export default function TreasureMessageForm({
  selectedTreasureName,
}: {
  selectedTreasureName: Treasure | undefined;
}) {
  const [isCreateMessageModalOpen, setIsCreateMessageModal] = useState(false);
  const [content, setContent] = useState('');

  return (
    <StyledTextareaWrapper>
      <TreasureBoxTextarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        onClick={() => setIsCreateMessageModal(true)}
        font="Cafe24Ohsquare"
        disabled={!content.length}
      >
        작성완료
      </Button>
      {isCreateMessageModalOpen && (
        <CreateMessageModal
          position={Date.now() / 1000}
          form={{
            content,
            font: 'Cafe24Ohsquare',
            fontColor: 'brown-700',
            theme: selectedTreasureName!,
          }}
          onCloseModal={() => setIsCreateMessageModal(false)}
          contentType="treasurebox"
        />
      )}
    </StyledTextareaWrapper>
  );
}
const StyledTextareaWrapper = styled.div`
  position: relative;
  width: 100%;
  z-index: 10;
  display: flex;
  height: 100%;
  flex-direction: column;

  button {
    margin-top: auto;
  }
`;
