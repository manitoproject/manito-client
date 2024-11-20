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
import useMessageForm from '@/hooks/use-message-form';
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

export default function DecoEditPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const { data: messages } = useQuery(messageQueries.paper(Number(id)));
  const currentMessageIndex = messages?.findIndex(
    (message) => message.id === state.id,
  );
  const currentMessage = messages?.[currentMessageIndex ?? 0];
  const { form, handleChangeForm } = useMessageForm(currentMessage);
  const [isFontSheetOpen, setIsFontSheetOpen] = useState(false);
  const [isButtonOpen, setIsButtonOpen] = useState(false);

  const { mutate } = useEditMessage({
    content: 'cake',
    messageId: state.id,
    paperId: Number(id),
  });
  const handleMessageSubmit = () => {
    mutate({
      ...form,
      id: state.id,
    });
  };

  const bg = findBgByPosition((currentMessageIndex ?? 0) + 1);
  const topNoticeBgColor = findCakeThemeStyle(form.emoji)?.bgColor;

  useSetHeader({
    rightBtn: false,
    title: '메시지 수정',
  });

  useEffect(() => {
    setIsFontSheetOpen(true);
  }, []);

  return (
    <StyledWrapper>
      <TopNotice bgColor={topNoticeBgColor} />
      <CakeTextarea
        themeName={form.emoji}
        content={form.content}
        onChangeContent={handleChangeForm}
        fontName={form.font}
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
              <FontList
                activeFont={form.font}
                onChangeFont={handleChangeForm}
              />
              <Button
                onClick={handleMessageSubmit}
                disabled={!form.content.length}
              >
                수정완료
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
