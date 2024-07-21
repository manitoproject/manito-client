import useOutsideClick from '../../../hooks/common/useOutsideClick';
import {
  StyledBottomSheet,
  StyledBottomSheetHeader,
} from './bottom-sheet.style';

export interface BottomSheetProps {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  isDetailPage?: boolean;
}

const detailPageHeight = 472;
const newPageHeight = 436;

export default function BottomSheet({
  isOpen,
  onToggle,
  children,
  isDetailPage = false,
}: BottomSheetProps) {
  const ref = useOutsideClick(onToggle, isOpen);

  return (
    <StyledBottomSheet
      height={isDetailPage ? detailPageHeight : newPageHeight}
      ref={ref}
      isOpen={isOpen}
    >
      <StyledBottomSheetHeader onClick={onToggle}>
        <div />
      </StyledBottomSheetHeader>
      {children}
    </StyledBottomSheet>
  );
}
