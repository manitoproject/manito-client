import styled from '@emotion/styled';
import { useState } from 'react';

import RollingHeader from '../components/rolling/rolling-header';
import RollingList from '../components/rolling/rolling-list';
import BottomSheet from '../components/theme/bottom-sheet';

export default function Rolling() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [activeEmojiIndex, setActiveEmojiIndex] = useState<null | number>(null);

  return (
    <StyledWrapper>
      <RollingHeader />
      <RollingList
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
