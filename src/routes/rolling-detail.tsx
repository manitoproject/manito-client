import styled from '@emotion/styled';
import { useState } from 'react';

import BottomSheet from '../components/detail/bottom-sheet';
import RollingHeader from '../components/detail/detail-header';
import RollingList from '../components/detail/letter-list';

export default function RollingDetail() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [activeEmojiIndex, setActiveEmojiIndex] = useState<null | number>(null);

  return (
    <StyledWrapper>
      <RollingHeader />
      <RollingList
        setActiveEmojiIndex={setActiveEmojiIndex}
        activeEmojiIndex={activeEmojiIndex}
        onBottomSheetOpen={setIsBottomSheetOpen}
      />
      <BottomSheet
        activeEmojiIndex={activeEmojiIndex}
        onActiveEmojiChange={(i: number) => setActiveEmojiIndex(i)}
        onClose={() => setIsBottomSheetOpen(false)}
        isOpen={isBottomSheetOpen}
      />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;
