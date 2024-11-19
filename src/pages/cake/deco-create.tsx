import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Sheet } from 'react-modal-sheet';
import { useLocation, useParams } from 'react-router-dom';

import CakeTextarea from '@/components/cake/textarea';
import TopNotice from '@/components/cake/top-notice';
import { Button } from '@/components/common/button/buttons';
import MessageCreateModal from '@/components/modal/create-message-modal';
import BottomSheetButton from '@/components/rollingpaper/bottom-sheet/button';
import FontList from '@/components/rollingpaper/bottom-sheet/font-sheet/font-list';
import BottomSheetheader from '@/components/rollingpaper/bottom-sheet/header';
import ReactHelmet from '@/helmet';
import useSetHeader from '@/hooks/use-set-header';
import { findBgByPosition, findCakeThemeStyle } from '@/lib/cake-decoration';
import { messageQueries } from '@/lib/query-factory';
import { StyledBackdrop } from '@/pages/rollingpaper/list.style';
import {
  StyledCustomSheet,
  StyledSheetContentWrapper,
} from '@/pages/rollingpaper/message.style';
import { StyledContentOverlay } from '@/styles/styled';
import { FontNameWithoutAppleFont } from '@/styles/theme';

export default function DecoCreatePage() {
  const params = useParams();
  const location = useLocation();
  const { data: messages } = useQuery(messageQueries.paper(Number(params.id)));
  const position = messages?.length ?? 0;
  const activeTheme = location.state.theme;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState('');
  const [isFontSheetOpen, setIsFontSheetOpen] = useState(false);
  const [isButtonOpen, setIsButtonOpen] = useState(false);
  const [activeFont, setActiveFont] =
    useState<FontNameWithoutAppleFont>('Cafe24Ssurround');
  const bg = findBgByPosition(position + 1);
  useSetHeader({
    rightBtn: false,
    title: '메시지 작성',
  });
  const style = findCakeThemeStyle(activeTheme);
  useEffect(() => {
    setIsFontSheetOpen(true);
  }, []);
  return (
    <StyledWrapper>
      <TopNotice bgColor={style?.bgColor} />
      <CakeTextarea
        themeName={activeTheme}
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
              <Button
                onClick={() => setIsModalOpen(true)}
                disabled={!content.length}
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
        disabled={!content.length}
        onClick={() => setIsModalOpen(true)}
      >
        작성완료
      </BottomSheetButton>
      {isModalOpen && (
        <MessageCreateModal
          position={Date.now() / 1000}
          emoji={activeTheme}
          color="gray-900"
          font={activeFont}
          content={content}
          onCloseModal={() => setIsModalOpen(false)}
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
