import { useEffect, useState } from 'react';

import { useLocationStateProps } from '../../hooks';
import { ColorName, FontNameWithoutAppleFont } from '../../styles/theme';
import BottomSheet from '../detail/bottom-sheet/bottom-sheet';
import { StyledBottomSheetContentWrapper } from '../detail/bottom-sheet/bottom-sheet.style';
import ColorList from '../detail/bottom-sheet/font-sheet/color-list';
import FontList from '../detail/bottom-sheet/font-sheet/font-list';
import FontSelectorSheet from '../detail/bottom-sheet/font-sheet/font-selector-sheet';

interface MessageFormBottomSheetProps {
  activeFont: FontNameWithoutAppleFont;
  setActiveFont: React.Dispatch<React.SetStateAction<FontNameWithoutAppleFont>>;
  activeColor: ColorName;
  setActiveColor: React.Dispatch<React.SetStateAction<ColorName>>;
  children: React.ReactNode;
}

export default function MessageFormBottomSheet({
  activeColor,
  activeFont,
  setActiveColor,
  setActiveFont,
  children,
}: MessageFormBottomSheetProps) {
  const messageInfo = useLocationStateProps();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);

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
          {activeMenuIndex === 0 ? (
            <FontList activeFont={activeFont} setActiveFont={setActiveFont} />
          ) : (
            <ColorList
              theme={messageInfo.rollingThemeName}
              activeColor={activeColor}
              setActiveColor={setActiveColor}
            />
          )}
        </FontSelectorSheet>
        {children}
      </StyledBottomSheetContentWrapper>
    </BottomSheet>
  );
}
