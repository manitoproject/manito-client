import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import BottomSheet from '@/components/bottom-sheet/bottom-sheet';
import BottomSheetButton from '@/components/bottom-sheet/button';
import BottomSheetFontList from '@/components/bottom-sheet/palette/font-list';
import { Button } from '@/components/common/buttons/buttons';
import MakeCakeTextarea from '@/components/makecake/textarea';
import MakeCakeTopNotice from '@/components/makecake/top-notice';
import CreateMessageModal from '@/components/modal/create-message-modal';
import ReactHelmet from '@/helmet';
import useMessageForm from '@/hooks/use-message-form';
import useSetHeader from '@/hooks/use-set-header';
import { findBgByPosition, findCakeThemeStyle } from '@/lib/cake-decoration';
import { messageQueries } from '@/lib/query-factory';
import { StyledBackdrop } from '@/pages/rollingpaper/list.style';
import { StyledContentOverlay } from '@/styles/styled';

export default function MakeCakeCreateMessage() {
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
      <MakeCakeTopNotice bgColor={topNoticeBgColor} />
      <MakeCakeTextarea
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
        <BottomSheetFontList
          activeFont={form.font}
          onChangeFont={handleChangeForm}
        />
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
        <CreateMessageModal
          position={Date.now() / 1000}
          form={form}
          onCloseModal={() => setIsCreateMessageModal(false)}
          contentType="makecake"
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
