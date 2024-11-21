import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import BottomSheet from '@/components/bottom-sheet/bottom-sheet';
import BottomSheetButton from '@/components/bottom-sheet/button';
import ColorList from '@/components/bottom-sheet/palette/color-list';
import FontList from '@/components/bottom-sheet/palette/font-list';
import FontPalette, {
  FontMenu,
} from '@/components/bottom-sheet/palette/font-palette';
import { Button } from '@/components/common/buttons/buttons';
import EmojiSkin from '@/components/rollingpaper/emoji-skin';
import ReactHelmet from '@/helmet';
import useMessageForm from '@/hooks/use-message-form';
import useSetHeader from '@/hooks/use-set-header';
import { findSvgByThemeName } from '@/lib/cake-decoration';
import { messageQueries, paperQueries } from '@/lib/query-factory';
import { ROLLINGPAPER_BG_MAP } from '@/lib/rolling-paper';
import { useEditMessage } from '@/mutations/message';
import { StyledBackdrop } from '@/pages/rollingpaper/list.style';
import {
  StyledRollingFormEmojiWrapper,
  StyledRollingFormWrapper,
} from '@/pages/rollingpaper/message.style';

export default function RollingpaperMessageEditPage() {
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
  const { form, handleChangeForm } = useMessageForm(currentMessage);
  const Svg = findSvgByThemeName(currentMessage?.theme ?? '');

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

  return (
    <StyledRollingFormWrapper>
      <StyledBackdrop
        bg={ROLLINGPAPER_BG_MAP[paper?.theme ?? 'animal'].bgUrl}
      />
      <StyledRollingFormEmojiWrapper>
        <EmojiSkin message={form}>
          {Svg && <Svg />}
          <textarea
            name="content"
            value={form.content}
            onChange={handleChangeForm}
          />
        </EmojiSkin>
      </StyledRollingFormEmojiWrapper>
      <BottomSheet
        setIsBottomSheetOpen={setIsBottomSheetOpen}
        isOpen={isFontSheetOpen}
        onClose={() => setIsFontSheetOpen(false)}
      >
        <FontPalette
          activeMenu={activeMenu}
          onChangeActiveMenu={(menu: FontMenu) => setActiveMenu(menu)}
        >
          {activeMenu === 'font' ? (
            <FontList activeFont={form.font} onChangeFont={handleChangeForm} />
          ) : (
            <ColorList
              theme={paper?.theme ?? 'animal'}
              activeColor={form.fontColor}
              onChangeColor={handleChangeForm}
            />
          )}
        </FontPalette>
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
