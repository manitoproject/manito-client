import { useEffect, useState } from 'react';

import useOutsideClick from '../../../hooks/useOutsideClick';
import {
  StyledBottomSheet,
  StyledBottomSheetHeader,
} from './bottom-sheet.style';

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BottomSheet({
  isOpen,
  onClose,
  children,
}: BottomSheetProps) {
  const ref = useOutsideClick(onClose, isOpen);
  const [height, setHeight] = useState<number | undefined>();

  useEffect(() => {
    setHeight(ref.current?.getBoundingClientRect().height);
  }, [ref]);

  return (
    <StyledBottomSheet height={height} ref={ref} isOpen={isOpen}>
      <StyledBottomSheetHeader>
        <button />
      </StyledBottomSheetHeader>
      {children}
    </StyledBottomSheet>
  );
}
