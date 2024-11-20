import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import BottomSheet from '@/components/bottom-sheet/bottom-sheet';
import BottomSheetButton from '@/components/bottom-sheet/button';
import ColorList from '@/components/bottom-sheet/palette/color-list';
import EmojiPalette from '@/components/bottom-sheet/palette/emoji-palette';
import FontList from '@/components/bottom-sheet/palette/font-list';
import FontPalette, {
  FontMenu,
} from '@/components/bottom-sheet/palette/font-palette';
import { Button } from '@/components/common/buttons/buttons';
import CreateMessageModal from '@/components/modal/create-message-modal';
import EmojiSkin from '@/components/rollingpaper/emoji-skin';
import ReactHelmet from '@/helmet';
import useMessageForm from '@/hooks/use-message-form';
import useSetHeader from '@/hooks/use-set-header';
import { findSvgByThemeName } from '@/lib/cake-decoration';
import { paperQueries } from '@/lib/query-factory';
import { ROLLINGPAPER_BG_MAP } from '@/lib/rolling-paper';
import { StyledBackdrop } from '@/pages/rollingpaper/list.style';
import {
  StyledRollingFormEmojiWrapper,
  StyledRollingFormWrapper,
} from '@/pages/rollingpaper/message.style';

export default function MessageCreatePage() {
  const params = useParams();
  const location = useLocation();
  const { data: paper } = useQuery(paperQueries.detail(Number(params.id)));
  const [isEmojiSelectionPage, setisEmojiSelectionPage] = useState(true);
  const [isEmojiSheetOpen, setIsEmojiSheetOpen] = useState(false);
  const [isFontSheetOpen, setIsFontSheetOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isCreateMessageModalOpen, setIsCreateMessageModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState<FontMenu>('font');
  const { form, handleChangeForm } = useMessageForm();
  const Svg = findSvgByThemeName(form.theme);

  const handleMessageSubmit = () => {
    if (isEmojiSelectionPage) {
      setisEmojiSelectionPage(false);
      setIsEmojiSheetOpen(false);
      setIsFontSheetOpen(true);
    } else {
      setIsCreateMessageModal(true);
    }
  };

  const handleOpenSheet = () => {
    if (isEmojiSelectionPage) {
      setIsEmojiSheetOpen(true);
    } else {
      setIsFontSheetOpen(true);
    }
  };

  useSetHeader({
    title: isEmojiSelectionPage ? '편지 선택' : '편지 작성',
    bg: ROLLINGPAPER_BG_MAP[paper?.theme ?? 'animal'].bgColor,
    color: paper?.theme === 'animal' ? undefined : 'white',
  });

  useEffect(() => {
    if (isEmojiSelectionPage) {
      setActiveMenu('font');
      setIsEmojiSheetOpen(true);
      setIsFontSheetOpen(false);
    }
  }, [isEmojiSelectionPage]);

  return (
    <StyledRollingFormWrapper>
      <StyledBackdrop
        bg={ROLLINGPAPER_BG_MAP[paper?.theme ?? 'animal'].bgUrl}
      />
      <StyledRollingFormEmojiWrapper
        isEmojiSelectionPage={isEmojiSelectionPage}
      >
        <EmojiSkin message={form}>
          {Svg && <Svg />}
          {form.theme && (
            <textarea
              name="content"
              disabled={isEmojiSelectionPage}
              value={form.content}
              onChange={handleChangeForm}
            />
          )}
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
      <BottomSheet
        setIsBottomSheetOpen={setIsBottomSheetOpen}
        isOpen={isEmojiSheetOpen}
        onClose={() => setIsEmojiSheetOpen(false)}
      >
        <EmojiPalette
          activeEmoji={form.theme}
          onChangeEmoji={handleChangeForm}
          theme={paper?.theme ?? 'animal'}
        />
        <Button onClick={handleMessageSubmit} disabled={!form.theme}>
          편지 선택하기
        </Button>
      </BottomSheet>
      {isCreateMessageModalOpen && (
        <CreateMessageModal
          position={location.state.position}
          contentType="rollingpaper"
          form={form}
          onCloseModal={() => setIsCreateMessageModal(false)}
        />
      )}
      <BottomSheetButton
        isOpen={isBottomSheetOpen}
        onOpen={handleOpenSheet}
        disabled={isEmojiSelectionPage ? !form.fontColor : !form.content}
        onClick={handleMessageSubmit}
      >
        {isEmojiSelectionPage ? '편지 선택하기' : '작성 완료'}
      </BottomSheetButton>
      <ReactHelmet title={'편지 작성 - 마니또'} />
    </StyledRollingFormWrapper>
  );
}
