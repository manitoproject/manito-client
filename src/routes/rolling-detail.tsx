import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/common/buttons';
import BottomSheet from '../components/detail/bottom-sheet/bottom-sheet';
import EmojiSelectorSheet from '../components/detail/bottom-sheet/emoji-sheet/emoji-selector-sheet';
import DetailHeader from '../components/detail/detail-header';
import LetterList from '../components/detail/letter-list';
import { ThemeKey } from '../lib/theme-map';
import { routes } from '../router';
import {
  StyledBackdrop,
  StyledRollingDetail,
  StyledWrapper,
} from './rolling-detail.style';

const data: { ['theme']: ThemeKey } = {
  theme: 'space',
};

export default function RollingDetail() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [activeEmojiIndex, setActiveEmojiIndex] = useState<null | number>(null);
  const navigate = useNavigate();

  return (
    <StyledRollingDetail>
      <StyledWrapper>
        <DetailHeader />
        <LetterList
          setActiveEmojiIndex={setActiveEmojiIndex}
          activeEmojiIndex={activeEmojiIndex}
          onBottomSheetOpen={setIsBottomSheetOpen}
        />
        <BottomSheet
          onClose={() => setIsBottomSheetOpen(false)}
          isOpen={isBottomSheetOpen}
        >
          <EmojiSelectorSheet
            theme={data.theme}
            activeEmojiIndex={activeEmojiIndex}
            onActiveEmojiChange={(i: number) => setActiveEmojiIndex(i)}
          />
          <Button
            onClick={() => navigate(routes.rolling.new())}
            disabled={typeof activeEmojiIndex !== 'number'}
          >
            편지 선택하기
          </Button>
        </BottomSheet>
      </StyledWrapper>
      <StyledBackdrop themeName="nature" />
    </StyledRollingDetail>
  );
}
