import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/common/buttons';
import BottomSheet from '../components/detail/bottom-sheet/bottom-sheet';
import { StyledBottomSheetContentWrapper } from '../components/detail/bottom-sheet/bottom-sheet.style';
import ColorList from '../components/detail/bottom-sheet/font-sheet/color-list';
import FontList from '../components/detail/bottom-sheet/font-sheet/font-list';
import FontSelectorSheet from '../components/detail/bottom-sheet/font-sheet/font-selector-sheet';
import { ThemeKey } from '../lib/theme-map';
import { routes } from '../router';
import { StyledBackdrop } from './rolling-detail.style';

const data: { ['theme']: ThemeKey } = {
  theme: 'space',
};

export default function RollingNew() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true);
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const [activeFontIndex, setActiveFontIndex] = useState(0);
  const [activeColorIndex, setActiveColorIndex] = useState(0);

  const navigate = useNavigate();

  return (
    <StyledRollingNew>
      <StyledWrapper>
        <BottomSheet
          onClose={() => setIsBottomSheetOpen(false)}
          isOpen={isBottomSheetOpen}
        >
          <StyledBottomSheetContentWrapper>
            <FontSelectorSheet
              activeMenuIndex={activeMenuIndex}
              setActiveMenuIndex={setActiveMenuIndex}
            >
              {activeMenuIndex === 0 ? (
                <FontList
                  activeFontIndex={activeFontIndex}
                  setActiveFontIndex={setActiveFontIndex}
                />
              ) : (
                <ColorList
                  theme={data.theme}
                  activeColorIndex={activeColorIndex}
                  setActiveColorIndex={setActiveColorIndex}
                />
              )}
            </FontSelectorSheet>
            <Button
              onClick={() => navigate(routes.rolling.new())}
              // disabled={typeof activeEmojiIndex !== 'number'}
            >
              작성완료
            </Button>
          </StyledBottomSheetContentWrapper>
        </BottomSheet>
      </StyledWrapper>
      <StyledOverlayBackdrop themeName="nature" />
    </StyledRollingNew>
  );
}

const StyledRollingNew = styled.div``;
const StyledWrapper = styled.div`
  position: relative;
  z-index: 1;
`;
const StyledOverlayBackdrop = styled(StyledBackdrop)``;
