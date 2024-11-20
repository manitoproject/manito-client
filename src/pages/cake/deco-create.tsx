import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import BottomSheet from '@/components/bottom-sheet/bottom-sheet';
import BottomSheetButton from '@/components/bottom-sheet/button';
import FontList from '@/components/bottom-sheet/font-sheet/font-list';
import CakeTextarea from '@/components/cake/textarea';
import TopNotice from '@/components/cake/top-notice';
import { Button } from '@/components/common/buttons/buttons';
import MessageCreateModal from '@/components/modal/create-message-modal';
import ReactHelmet from '@/helmet';
import useMessageForm from '@/hooks/use-message-form';
import useSetHeader from '@/hooks/use-set-header';
import { findBgByPosition, findCakeThemeStyle } from '@/lib/cake-decoration';
import { messageQueries } from '@/lib/query-factory';
import { StyledBackdrop } from '@/pages/rollingpaper/list.style';
import { StyledContentOverlay } from '@/styles/styled';

export default function DecoCreatePage() {
  const params = useParams();
  const location = useLocation();
  const { data: messages } = useQuery(messageQueries.paper(Number(params.id)));
  const position = messages?.length ?? 0;
  const { form, handleChangeForm } = useMessageForm({
    theme: location.state.theme,
    fontColor: 'gray-900',
  });
  const [isCreateMessageModalOpen, setIsCreateMessageModal] = useState(false);
  const [isFontSheetOpen, setIsFontSheetOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const bg = findBgByPosition(position + 1);
  const topNoticeBgColor = findCakeThemeStyle(form.theme)?.bgColor;

  useSetHeader({
    rightBtn: false,
    title: '메시지 작성',
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
      <BottomSheet
        isOpen={isFontSheetOpen}
        setIsBottomSheetOpen={setIsBottomSheetOpen}
        onClose={() => setIsFontSheetOpen(false)}
      >
        <FontList activeFont={form.font} onChangeFont={handleChangeForm} />
        <Button
          onClick={() => setIsCreateMessageModal(true)}
          disabled={!form.content.length}
        >
          작성완료
        </Button>
      </BottomSheet>
      <BottomSheetButton
        isOpen={isBottomSheetOpen}
        onOpen={() => setIsFontSheetOpen(true)}
        disabled={!form.content.length}
        onClick={() => setIsCreateMessageModal(true)}
      >
        작성완료
      </BottomSheetButton>
      {isCreateMessageModalOpen && (
        <MessageCreateModal
          position={Date.now() / 1000}
          form={form}
          onCloseModal={() => setIsCreateMessageModal(false)}
          contentType="cake"
        />
      )}
      <StyledContentOverlay opacity={20} />
      <StyledBackdrop bg={bg} />
      <ReactHelmet title={'메시지 작성 - 마니또'} />
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
