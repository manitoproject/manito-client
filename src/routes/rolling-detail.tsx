import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/common/buttons';
import BottomSheet from '../components/detail/bottom-sheet/bottom-sheet';
import { StyledBottomSheetContentWrapper } from '../components/detail/bottom-sheet/bottom-sheet.style';
import EmojiSelectorSheet from '../components/detail/bottom-sheet/emoji-sheet/emoji-selector-sheet';
import DetailHeader from '../components/detail/detail-header';
import MessageList from '../components/detail/message-list';
import { usePaperDetailQuery } from '../queries/paper';
import { routes } from '../router';
import messageStore from '../stores/messageStore';
import {
  StyledBackdrop,
  StyledRollingDetail,
  StyledWrapper,
} from './rolling-detail.style';

export default function RollingDetail() {
  const { data } = usePaperDetailQuery();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { reset, activeEmojiIndex, activeMessageIndex } = messageStore();
  const navigate = useNavigate();

  useEffect(() => {
    return () => reset();
  }, [reset]);

  return (
    <StyledRollingDetail>
      <StyledWrapper>
        <DetailHeader paperId={data?.data?.id} />
        <MessageList
          paperId={data?.data?.id}
          onBottomSheetOpen={setIsBottomSheetOpen}
        />
        <BottomSheet
          isDetailPage
          onToggle={() => setIsBottomSheetOpen((prev) => !prev)}
          isOpen={isBottomSheetOpen}
        >
          <StyledBottomSheetContentWrapper>
            <EmojiSelectorSheet theme={data?.data?.theme} />
            <Button
              onClick={() =>
                navigate(
                  `${routes.rolling.new()}?theme=${data?.data?.theme}&paperId=${
                    data?.data?.id
                  }&emoji=${activeEmojiIndex}&position=${activeMessageIndex}`,
                )
              }
              disabled={typeof activeEmojiIndex !== 'number'}
            >
              편지 선택하기
            </Button>
          </StyledBottomSheetContentWrapper>
        </BottomSheet>
      </StyledWrapper>
      <StyledBackdrop themeName={data?.data?.theme} />
    </StyledRollingDetail>
  );
}
