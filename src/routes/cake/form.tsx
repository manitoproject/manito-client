import styled from '@emotion/styled';
import { useState } from 'react';
import { Sheet } from 'react-modal-sheet';

import { SmsEdit } from '@/assets/svg/icons';
import { Button } from '@/components/common/button/buttons';
import BottomSheetButton from '@/components/rollingpaper/bottom-sheet/button';
import FontList from '@/components/rollingpaper/bottom-sheet/font-sheet/font-list';
import BottomSheetheader from '@/components/rollingpaper/bottom-sheet/header';
import { DecorationType, getDecorationSvg } from '@/constants/cake-decoration';
import { Font, fonts } from '@/constants/fonts';
import { useSetHeader } from '@/hooks';
import {
  StyledCustomSheet,
  StyledSheetContentWrapper,
} from '@/routes/rollingpaper/form.style';
import { StyledBackdrop } from '@/routes/rollingpaper/list.style';
import { useCakeMessageInfo } from '@/stores/cake-message-store';
import { getFontSizeAndWeight } from '@/styles/mixins';
import { StyledContentOverlay } from '@/styles/styled';
import { ColorName, FontNameWithoutAppleFont } from '@/styles/theme';

const COLOR_MAP: Record<DecorationType, ColorName> = {
  strawberry: 'pink-100',
  vanilla: 'vanilla-100',
  chocolate: 'chocolate-100',
  white: 'gray-100',
};

export default function CakeForm() {
  const [content, setContent] = useState('');
  const [isFontSheetOpen, setIsFontSheetOpen] = useState(true);
  const [isButtonOpen, setIsButtonOpen] = useState(false);
  const [activeFont, setActiveFont] =
    useState<FontNameWithoutAppleFont>('Cafe24Ssurround');
  const { bg, decoration } = useCakeMessageInfo();
  useSetHeader({ rightBtn: false, title: '메시지 작성' });
  const foundDecoColor = Object.keys(COLOR_MAP).find((color) =>
    decoration?.toLowerCase().includes(color),
  );
  const font = fonts.find((font) => {
    return font.name === activeFont;
  });

  const decoColor =
    COLOR_MAP[(foundDecoColor as DecorationType) ?? 'chocolate'];
  if (!bg || !decoration) throw new Error();
  const DecorationSvg = getDecorationSvg(decoration);

  return (
    <StyledWrapper>
      <StyledNotice color={decoColor}>
        <div>
          <SmsEdit />
        </div>
        <p>
          나의 마니또에게
          <br />
          <span>짧은 메세지</span>를 작성해주세요.
        </p>
      </StyledNotice>
      <StyledTextareaWarpper color={decoColor} font={font}>
        <DecorationSvg width={96} height={96} />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </StyledTextareaWarpper>
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
              <Button disabled={!content.length}>작성완료</Button>
            </StyledSheetContentWrapper>
          </Sheet.Content>
        </Sheet.Container>
      </StyledCustomSheet>
      <BottomSheetButton
        isOpen={isButtonOpen}
        onOpen={() => setIsFontSheetOpen(true)}
        disabled={!content.length}
        onClick={() => console.log('sdf')}
      >
        {'작성완료'}
      </BottomSheetButton>
      <StyledContentOverlay />
      <StyledBackdrop bg={bg} />
    </StyledWrapper>
  );
}

const StyledTextareaWarpper = styled.div<{
  color: ColorName;
  font?: Font;
}>`
  svg {
    position: absolute;
    bottom: 212px;
  }
  position: relative;
  z-index: 50;
  padding: 12px;
  display: flex;
  align-items: center;
  top: 96px;
  border-radius: 12px;
  background-color: ${({ color, theme }) => theme.colors[color]};
  textarea {
    font-size: 18px;
    font-weight: ${({ font }) => font?.fontWeight};
    font-family: ${({ font }) => font?.name};
    outline: none;
    border-radius: 4px;
    border: 1px dashed black;
    color: ${({ theme }) => theme.colors['gray-900']};
    background-color: transparent;
    width: 100%;
    padding: 24px;
    height: 200px;
    resize: none;
  }
`;

const StyledWrapper = styled.div`
  width: 100%;
`;

const StyledNotice = styled.div<{ color: ColorName }>`
  div:first-child {
    padding: 10px;
    border-radius: 999px;
    background-color: ${({ color, theme }) => theme.colors[color]};
  }

  padding: 12px 0;
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
