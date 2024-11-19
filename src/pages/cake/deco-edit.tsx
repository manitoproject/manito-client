import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Sheet } from 'react-modal-sheet';
import { useLocation, useParams } from 'react-router-dom';

import CakeTextarea from '@/components/cake/textarea';
import TopNotice from '@/components/cake/top-notice';
import { Button } from '@/components/common/button/buttons';
import BottomSheetButton from '@/components/rollingpaper/bottom-sheet/button';
import FontList from '@/components/rollingpaper/bottom-sheet/font-sheet/font-list';
import BottomSheetheader from '@/components/rollingpaper/bottom-sheet/header';
import ReactHelmet from '@/helmet';
import useSetHeader from '@/hooks/use-set-header';
import { findBgByPosition, findCakeThemeStyle } from '@/lib/cake-decoration';
import { messageQueries } from '@/lib/query-factory';
import { useEditMessage } from '@/mutations/message';
import { StyledBackdrop } from '@/pages/rollingpaper/list.style';
import {
  StyledCustomSheet,
  StyledSheetContentWrapper,
} from '@/pages/rollingpaper/message.style';
import { StyledContentOverlay } from '@/styles/styled';
import { FontNameWithoutAppleFont } from '@/styles/theme';

export default function DecoEditPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const { data: messages } = useQuery(messageQueries.paper(Number(id)));
  const currentMessageIndex = messages?.findIndex(
    (message) => message.id === state.id,
  );
  const currentMessage = messages?.[currentMessageIndex ?? 0];
  const [content, setContent] = useState(currentMessage?.content ?? '');
  const [isFontSheetOpen, setIsFontSheetOpen] = useState(false);
  const [isButtonOpen, setIsButtonOpen] = useState(false);
  const [activeFont, setActiveFont] = useState<FontNameWithoutAppleFont>(
    currentMessage?.font ?? 'Cafe24Ssurround',
  );
  const { mutate } = useEditMessage({
    content: 'cake',
    messageId: state.id,
    paperId: Number(id),
  });
  const handleMessageSubmit = () => {
    mutate({
      content,
      font: activeFont,
      fontColor: 'gray-900',
      id: state.id,
    });
  };

  const bg = findBgByPosition((currentMessageIndex ?? 0) + 1);

  useSetHeader({
    rightBtn: false,
    title: '메시지 수정',
  });
  const style = findCakeThemeStyle(currentMessage?.theme ?? '');

  useEffect(() => {
    setIsFontSheetOpen(true);
  }, []);

  return (
    <StyledWrapper>
      <TopNotice bgColor={style?.bgColor} />
      <CakeTextarea
        themeName={currentMessage?.theme ?? ''}
        content={content}
        setContent={setContent}
        fontName={activeFont}
      />
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
              <FontList activeFont={activeFont} setActiveFont={setActiveFont} />
              <Button onClick={handleMessageSubmit} disabled={!content.length}>
                수정완료
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
        수정완료
      </BottomSheetButton>
      <StyledContentOverlay opacity={20} />
      <StyledBackdrop bg={bg} />
      <ReactHelmet title={'메시지 수정 - 마니또'} />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 13%;
`;
