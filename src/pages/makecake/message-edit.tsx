import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import CustomSheet from '@/components/bottom-sheet/bottom-sheet';
import BottomSheetButton from '@/components/bottom-sheet/button';
import FontList from '@/components/bottom-sheet/palette/font-list';
import { Button } from '@/components/common/buttons/buttons';
import CakeTextarea from '@/components/makecake/textarea';
import TopNotice from '@/components/makecake/top-notice';
import ReactHelmet from '@/helmet';
import useMessageForm from '@/hooks/use-message-form';
import useSetHeader from '@/hooks/use-set-header';
import { findBgByPosition, findCakeThemeStyle } from '@/lib/cake-decoration';
import { messageQueries } from '@/lib/query-factory';
import { useEditMessage } from '@/mutations/message';
import { StyledBackdrop } from '@/pages/rollingpaper/list.style';
import { StyledContentOverlay } from '@/styles/styled';

export default function CakeMessageEditPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const { data: messages } = useQuery(messageQueries.paper(Number(id)));
  const currentMessageIndex = messages?.findIndex(
    (message) => message.id === state.id,
  );
  const currentMessage = messages?.[currentMessageIndex ?? 0];
  const { form, handleChangeForm } = useMessageForm(currentMessage);
  const [isFontSheetOpen, setIsFontSheetOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const { mutate } = useEditMessage({
    content: 'makecake',
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
  const topNoticeBgColor = findCakeThemeStyle(form.theme)?.bgColor;

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
        themeName={form.theme}
        content={form.content}
        onChangeContent={handleChangeForm}
        fontName={form.font}
      />
      <CustomSheet
        isOpen={isFontSheetOpen}
        setIsBottomSheetOpen={setIsBottomSheetOpen}
        onClose={() => setIsFontSheetOpen(false)}
      >
        <FontList activeFont={form.font} onChangeFont={handleChangeForm} />
        <Button onClick={handleMessageSubmit} disabled={!form.content.length}>
          수정완료
        </Button>
      </CustomSheet>
      <BottomSheetButton
        isOpen={isBottomSheetOpen}
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
