import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Sheet } from 'react-modal-sheet';
import { useParams } from 'react-router-dom';

import { SmsEdit } from '@/assets/svg/icons';
import CakeTextarea from '@/components/cake/textarea';
import { Button } from '@/components/common/button/buttons';
import MessageCreateModal from '@/components/modal/create-message-modal';
import BottomSheetButton from '@/components/rollingpaper/bottom-sheet/button';
import FontList from '@/components/rollingpaper/bottom-sheet/font-sheet/font-list';
import BottomSheetheader from '@/components/rollingpaper/bottom-sheet/header';
import { findCakeThemeStyle } from '@/constants/cake-decoration';
import ReactHelmet from '@/helmet';
import useSetHeader from '@/hooks/use-set-header';
import { StyledBackdrop } from '@/pages/rollingpaper/list.style';
import {
  StyledCustomSheet,
  StyledSheetContentWrapper,
} from '@/pages/rollingpaper/message.style';
import { useMessageInfo } from '@/stores/message-store';
import { getFontSizeAndWeight } from '@/styles/mixins';
import { StyledContentOverlay } from '@/styles/styled';
import { ColorName, FontNameWithoutAppleFont } from '@/styles/theme';

export default function CakeForm() {
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState('');
  const [isFontSheetOpen, setIsFontSheetOpen] = useState(false);
  const [isButtonOpen, setIsButtonOpen] = useState(false);
  const [activeFont, setActiveFont] =
    useState<FontNameWithoutAppleFont>('Cafe24Ssurround');
  const { bg, theme } = useMessageInfo();
  useSetHeader({
    rightBtn: false,
    title: params.type === 'create' ? '메시지 작성 ' : '메시지 수정',
  });
  if (!bg || !theme || !params.id) throw new Error();
  const style = findCakeThemeStyle(theme);

  useEffect(() => {
    setIsFontSheetOpen(true);
  }, []);

  return (
    <StyledWrapper>
      <StyledNotice color={style?.bgColor}>
        <div>
          <SmsEdit />
        </div>
        <p>
          나의 마니또에게
          <br />
          <span>짧은 메세지</span>를 작성해주세요.
        </p>
      </StyledNotice>
      <CakeTextarea
        themeName={theme}
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
        {'작성완료'}
      </BottomSheetButton>
      {isModalOpen && (
        <MessageCreateModal
          emoji={theme}
          color="gray-900"
          font={activeFont}
          content={content}
          onCloseModal={() => setIsModalOpen(false)}
          contentType="cake"
        />
      )}
      <StyledContentOverlay opacity={20} />
      <StyledBackdrop bg={bg} />
      <ReactHelmet
        title={`${
          params.type === 'create' ? '메시지 작성 ' : '메시지 수정'
        } - 마니또`}
      />
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

const StyledNotice = styled.div<{ color: ColorName | undefined }>`
  div {
    padding: 10px;
    border-radius: 999px;
    background-color: ${({ color, theme }) => color && theme.colors[color]};
  }

  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 50;
  font-family: ${({ theme }) => theme.fontFamily.SpoqaHanSansNeo};
  color: ${({ theme }) => theme.colors['gray-800']};
  ${getFontSizeAndWeight('heading1', 'medium')};
  span {
    color: ${({ theme }) => theme.colors['gray-900']};
    ${getFontSizeAndWeight('heading1', 'bold')};
  }
`;
