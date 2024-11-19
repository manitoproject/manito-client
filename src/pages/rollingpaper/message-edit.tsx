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
import useSetHeader from '@/hooks/use-set-header';
import { findSvgByThemeName } from '@/lib/cake-decoration';
import { ROLLINGPAPER_BG_MAP } from '@/lib/rolling-paper';
import { StyledBackdrop } from '@/pages/rollingpaper/list.style';
import {
  StyledCustomSheet,
  StyledRollingFormEmojiWrapper,
  StyledRollingFormWrapper,
  StyledSheetContentWrapper,
} from '@/pages/rollingpaper/message.style';
import { useEditMessage } from '@/queries/message';
import queries from '@/queries/query-key-factory';
import { ColorName, FontNameWithoutAppleFont } from '@/styles/theme';

export default function MessageEditPage() {
  const params = useParams();
  const location = useLocation();
  const { data: paperData } = useQuery(
    queries.papers.detail(Number(params.id)),
  );
  const { data: messageData } = useQuery(
    queries.messages.paper(Number(params.id)),
  );
  const currentMessage = messageData?.data?.find(
    (message) => message.id === location.state.id,
  );
  const [isFontSheetOpen, setIsFontSheetOpen] = useState(false);
  const [isButtonOpen, setIsButtonOpen] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const Svg = findSvgByThemeName(currentMessage?.theme ?? '');
  const [activeFont, setActiveFont] = useState<FontNameWithoutAppleFont>(
    currentMessage?.font ?? 'Cafe24Ssurround',
  );
  const [activeColor, setActiveColor] = useState<ColorName>(
    currentMessage?.fontColor ?? 'white',
  );
  const [content, setContent] = useState(currentMessage?.content ?? '');

  useSetHeader({
    title: '수정하기',
    bg: ROLLINGPAPER_BG_MAP[paperData?.data?.theme ?? 'animal'].bgColor,
    color: paperData?.data?.theme === 'animal' ? undefined : 'white',
  });

  const { mutate } = useEditMessage();
  const handleMessageSubmit = () => {
    mutate({
      content,
      font: activeFont,
      fontColor: activeColor,
      id: location.state.id,
    });
  };

  useEffect(() => {
    setIsFontSheetOpen(true);
  }, []);

  return (
    <StyledRollingFormWrapper>
      <StyledBackdrop
        bg={ROLLINGPAPER_BG_MAP[paperData?.data?.theme ?? 'animal'].bgUrl}
      />
      <StyledRollingFormEmojiWrapper>
        <EmojiSkin
          message={{
            font: activeFont,
            fontColor: activeColor,
            theme: currentMessage?.theme,
          }}
        >
          {Svg && <Svg />}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
                    activeFont={activeFont}
                    setActiveFont={setActiveFont}
                  />
                ) : (
                  <ColorList
                    theme={paperData?.data?.theme ?? 'animal'}
                    activeColor={activeColor}
                    setActiveColor={setActiveColor}
                  />
                )}
              </FontSheet>
              <Button onClick={handleMessageSubmit} disabled={!content.length}>
                작성완료
              </Button>
            </StyledSheetContentWrapper>
          </Sheet.Content>
        </Sheet.Container>
      </StyledCustomSheet>

      <BottomSheetButton
        isOpen={isButtonOpen}
        onOpen={() => setIsFontSheetOpen(true)}
        disabled={!content.length}
        onClick={handleMessageSubmit}
      >
        작성 완료
      </BottomSheetButton>
      <ReactHelmet title={'편지 수정 - 마니또'} />
    </StyledRollingFormWrapper>
  );
}
