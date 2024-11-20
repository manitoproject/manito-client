import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Sheet } from 'react-modal-sheet';
import { useLocation, useParams } from 'react-router-dom';

import { Button } from '@/components/common/button/buttons';
import BottomSheetButton from '@/components/rollingpaper/bottom-sheet/button';
import ColorList from '@/components/rollingpaper/bottom-sheet/font-sheet/color-list';
import FontList from '@/components/rollingpaper/bottom-sheet/font-sheet/font-list';
import FontSheet from '@/components/rollingpaper/bottom-sheet/font-sheet/font-sheet';
import BottomSheetheader from '@/components/rollingpaper/bottom-sheet/header';
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
  StyledCustomSheet,
  StyledRollingFormEmojiWrapper,
  StyledRollingFormWrapper,
  StyledSheetContentWrapper,
} from '@/pages/rollingpaper/message.style';

export default function MessageEditPage() {
  const params = useParams();
  const location = useLocation();
  const { data: paper } = useQuery(paperQueries.detail(Number(params.id)));
  const { data: messages } = useQuery(messageQueries.paper(Number(params.id)));
  const currentMessage = messages?.find(
    (message) => message.id === location.state.id,
  );
  const [isFontSheetOpen, setIsFontSheetOpen] = useState(false);
  const [isButtonOpen, setIsButtonOpen] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const { form, handleChangeForm } = useMessageForm(currentMessage);
  const Svg = findSvgByThemeName(currentMessage?.theme ?? '');

  useSetHeader({
    title: '수정하기',
    bg: ROLLINGPAPER_BG_MAP[paper?.theme ?? 'animal'].bgColor,
    color: paper?.theme === 'animal' ? undefined : 'white',
  });

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
      <StyledCustomSheet
        onCloseEnd={() => setIsButtonOpen(true)}
        detent="content-height"
        isOpen={isFontSheetOpen}
        onClose={() => setIsFontSheetOpen(false)}
        onOpenEnd={() => setIsButtonOpen(false)}
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

      <BottomSheetButton
        isOpen={isButtonOpen}
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
