import { Sheet } from 'react-modal-sheet';

import {
  StyledCustomSheet,
  StyledSheetContentWrapper,
} from '@/components/bottom-sheet/bottom-sheet.style';
import BottomSheetheader from '@/components/bottom-sheet/header';

interface CustomSheetProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsBottomSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}

export default function BottomSheet({
  children,
  isOpen,
  onClose,
  setIsBottomSheetOpen,
}: CustomSheetProps) {
  return (
    <StyledCustomSheet
      onCloseEnd={() => setIsBottomSheetOpen(true)}
      detent="content-height"
      isOpen={isOpen}
      onClose={onClose}
      onOpenEnd={() => setIsBottomSheetOpen(false)}
    >
      <Sheet.Container>
        <Sheet.Header>
          <BottomSheetheader />
        </Sheet.Header>
        <Sheet.Content>
          <StyledSheetContentWrapper>{children}</StyledSheetContentWrapper>
        </Sheet.Content>
      </Sheet.Container>
    </StyledCustomSheet>
  );
}
