import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Sheet } from 'react-modal-sheet';
import { useLocation, useParams } from 'react-router-dom';

import { Button } from '@/components/common/buttons/buttons';
import CreateMessageModal from '@/components/modal/create-message-modal';
import BottomSheetButton from '@/components/rollingpaper/bottom-sheet/button';
import EmojiSheet from '@/components/rollingpaper/bottom-sheet/emoji-sheet/emoji-sheet';
import ColorList from '@/components/rollingpaper/bottom-sheet/font-sheet/color-list';
import FontList from '@/components/rollingpaper/bottom-sheet/font-sheet/font-list';
import FontSheet from '@/components/rollingpaper/bottom-sheet/font-sheet/font-sheet';
import BottomSheetheader from '@/components/rollingpaper/bottom-sheet/header';
import EmojiSkin from '@/components/rollingpaper/emoji-skin';
import ReactHelmet from '@/helmet';
import useMessageForm from '@/hooks/use-message-form';
import useSetHeader from '@/hooks/use-set-header';
import { findSvgByThemeName } from '@/lib/cake-decoration';
import { paperQueries } from '@/lib/query-factory';
import { ROLLINGPAPER_BG_MAP } from '@/lib/rolling-paper';
import { StyledBackdrop } from '@/pages/rollingpaper/list.style';
import {
  StyledCustomSheet,
  StyledRollingFormEmojiWrapper,
  StyledRollingFormWrapper,
  StyledSheetContentWrapper,
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
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const { form, handleChangeForm } = useMessageForm();
  const Svg = findSvgByThemeName(form.emoji);

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
      setActiveMenuIndex(0);
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
          {form.emoji && (
            <textarea
              name="content"
              disabled={isEmojiSelectionPage}
              value={form.content}
              onChange={handleChangeForm}
            />
          )}
        </EmojiSkin>
      </StyledRollingFormEmojiWrapper>
      <StyledCustomSheet
        onCloseEnd={() => setIsBottomSheetOpen(true)}
        detent="content-height"
        isOpen={isFontSheetOpen}
        onClose={() => setIsFontSheetOpen(false)}
        onOpenEnd={() => setIsBottomSheetOpen(false)}
      >
        <Sheet.Container>
          <Sheet.Header>
            <BottomSheetheader />
          </Sheet.Header>
          <Sheet.Content>
            <StyledSheetContentWrapper>
              <FontSheet
                activeMenuIndex={activeMenuIndex}
                setActiveMenuIndex={setActiveMenuIndex}
              >
                {activeMenuIndex === 0 ? (
                  <FontList
                    activeFont={form.font}
                    onChangeFont={handleChangeForm}
                  />
                ) : (
                  <ColorList
                    theme={paper?.theme ?? 'animal'}
                    activeColor={form.fontColor}
                    onChangeColor={handleChangeForm}
                  />
                )}
              </FontSheet>
              <Button
                onClick={handleMessageSubmit}
                disabled={!form.content.length}
              >
                작성완료
              </Button>
            </StyledSheetContentWrapper>
          </Sheet.Content>
        </Sheet.Container>
      </StyledCustomSheet>

      <StyledCustomSheet
        onOpenEnd={() => setIsBottomSheetOpen(false)}
        onCloseEnd={() => setIsBottomSheetOpen(true)}
        isOpen={isEmojiSheetOpen}
        onClose={() => setIsEmojiSheetOpen(false)}
        detent="content-height"
      >
        <Sheet.Container>
          <Sheet.Header>
            <BottomSheetheader />
          </Sheet.Header>
          <Sheet.Content>
            <StyledSheetContentWrapper>
              <EmojiSheet
                activeEmoji={form.emoji}
                handleChangeEmoji={handleChangeForm}
                theme={paper?.theme ?? 'animal'}
              />
              <Button onClick={handleMessageSubmit} disabled={!form.emoji}>
                편지 선택하기
              </Button>
            </StyledSheetContentWrapper>
          </Sheet.Content>
        </Sheet.Container>
      </StyledCustomSheet>

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
