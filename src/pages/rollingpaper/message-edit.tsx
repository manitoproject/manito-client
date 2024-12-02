import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import BottomSheet from '@/components/bottom-sheet/bottom-sheet';
import BottomSheetButton from '@/components/bottom-sheet/button';
import BottomSheetColorList from '@/components/bottom-sheet/palette/color-list';
import BottomSheetFontList from '@/components/bottom-sheet/palette/font-list';
import BottomSheetFontPalette, {
  FontMenu,
} from '@/components/bottom-sheet/palette/font-palette';
import { Button } from '@/components/common/buttons/buttons';
import RollingpaperEmojiSkin from '@/components/rollingpaper/emoji-skin';
import ReactHelmet from '@/helmet';
import useMessageForm from '@/hooks/use-message-form';
import useSetHeader from '@/hooks/use-set-header';
import { findImgByThemeName } from '@/lib/common';
import { messageQueries, paperQueries } from '@/lib/query-factory';
import { ROLLINGPAPER_BG_MAP } from '@/lib/rolling-paper';
import { useEditMessage } from '@/mutations/message';
import { StyledBackdrop } from '@/pages/rollingpaper/list.style';
import {
  StyledRollingFormEmojiWrapper,
  StyledRollingFormWrapper,
} from '@/pages/rollingpaper/message.style';

export default function RollingpaperEditMessage() {
  const params = useParams();
  const location = useLocation();
  const { data: paper } = useQuery(paperQueries.detail(Number(params.id)));
  const { data: messages } = useQuery(messageQueries.paper(Number(params.id)));
  const currentMessage = messages?.find(
    (message) => message.id === location.state.id,
  );
  const [isFontSheetOpen, setIsFontSheetOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<FontMenu>('font');
  const { form, handleFormChange } = useMessageForm(currentMessage);

  const { mutate } = useEditMessage({
    content: 'rollingpaper',
    messageId: currentMessage?.id,
    paperId: Number(params.id),
  });

  const handleMessageSubmit = () => {
    mutate({
      ...form,
      id: location.state.id,
    });
  };

  useSetHeader({
    title: '수정하기',
    bg: ROLLINGPAPER_BG_MAP[paper?.theme ?? 'animal'].bgColor,
    color: paper?.theme === 'animal' ? undefined : 'white',
  });

  useEffect(() => {
    setIsFontSheetOpen(true);
  }, []);
  //확인

  return (
    <StyledRollingFormWrapper>
      <StyledBackdrop
        bg={ROLLINGPAPER_BG_MAP[paper?.theme ?? 'animal'].bgUrl}
      />
      <StyledRollingFormEmojiWrapper>
        <RollingpaperEmojiSkin message={form}>
          <img
            src={findImgByThemeName(currentMessage?.theme ?? '')}
            alt={currentMessage?.theme}
          />
          <textarea
            name="content"
            value={form.content}
            onChange={handleFormChange}
          />
        </RollingpaperEmojiSkin>
      </StyledRollingFormEmojiWrapper>
      <BottomSheet
        setIsBottomSheetOpen={setIsBottomSheetOpen}
        isOpen={isFontSheetOpen}
        onClose={() => setIsFontSheetOpen(false)}
      >
        <BottomSheetFontPalette
          activeMenu={activeMenu}
          onChangeActiveMenu={(menu: FontMenu) => setActiveMenu(menu)}
        >
          {activeMenu === 'font' ? (
            <BottomSheetFontList
              activeFont={form.font}
              onChangeFont={handleFormChange}
            />
          ) : (
            <BottomSheetColorList
              theme={paper?.theme ?? 'animal'}
              activeColor={form.fontColor}
              onChangeColor={handleFormChange}
            />
          )}
        </BottomSheetFontPalette>
        <Button onClick={handleMessageSubmit} disabled={!form.content.length}>
          작성완료
        </Button>
      </BottomSheet>
      <BottomSheetButton
        isOpen={isBottomSheetOpen}
        onOpen={() => setIsFontSheetOpen(true)}
        disabled={!form.content.length}
        onClick={handleMessageSubmit}
      >
        작성 완료
      </BottomSheetButton>
      <ReactHelmet title={'편지 수정 - 마니또'} />
    </StyledRollingFormWrapper>
  );
}
