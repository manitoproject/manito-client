import styled from '@emotion/styled';

import { SmsEdit } from '@/assets/svg/icons';
import { getFontSizeAndWeight } from '@/styles/mixins';
import { ColorName } from '@/styles/theme';

interface MakeCakeTopNoticeProps {
  bgColor: ColorName | undefined;
}

export default function MakeCakeTopNotice({ bgColor }: MakeCakeTopNoticeProps) {
  return (
    <StyledNotice bgColor={bgColor}>
      <div>
        <SmsEdit />
      </div>
      <p>
        나의 마니또에게
        <br />
        <span>짧은 메세지</span>를 작성해주세요.
      </p>
    </StyledNotice>
  );
}
const StyledNotice = styled.div<{ bgColor: ColorName | undefined }>`
  div {
    padding: 10px;
    border-radius: 999px;
    background-color: ${({ bgColor, theme }) =>
      bgColor && theme.colors[bgColor]};
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
