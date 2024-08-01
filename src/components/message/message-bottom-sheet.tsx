import { useEffect, useState } from 'react';

import BottomSheet from '../bottom-sheet/bottom-sheet';
import { StyledBottomSheetContentWrapper } from '../bottom-sheet/bottom-sheet.style';
import ColorList from '../bottom-sheet/font-sheet/color-list';
import FontList from '../bottom-sheet/font-sheet/font-list';
import FontSelectorSheet from '../bottom-sheet/font-sheet/font-selector-sheet';
import { Button } from '../common/buttons';

interface MessageBottomSheetProps {
  messageValue: string;
}

export default function MessageBottomSheet({
  messageValue,
}: MessageBottomSheetProps) {
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  useEffect(() => {
    setIsBottomSheetOpen(true);
  }, []);

  return (
    <BottomSheet
      onToggle={() => setIsBottomSheetOpen((prev) => !prev)}
      isOpen={isBottomSheetOpen}
    >
      <StyledBottomSheetContentWrapper>
        <FontSelectorSheet
          activeMenuIndex={activeMenuIndex}
          setActiveMenuIndex={setActiveMenuIndex}
        >
          {!activeMenuIndex ? (
            <FontList
              activeFontIndex={activeFontIndex}
              setActiveFontIndex={setActiveFontIndex}
            />
          ) : (
            <ColorList
              theme={theme}
              activeColorIndex={activeColorIndex}
              setActiveColorIndex={setActiveColorIndex}
            />
          )}
        </FontSelectorSheet>
        <Button
          onClick={() => setIsModalOpen(true)}
          disabled={!messageValue.length}
        >
          작성완료
        </Button>
      </StyledBottomSheetContentWrapper>
    </BottomSheet>
  );
}
