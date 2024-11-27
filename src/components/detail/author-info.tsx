import styled from '@emotion/styled';

import { getFontSizeAndWeight } from '@/styles/mixins';
import { ColorName } from '@/styles/theme';

interface AuthorInfoLengthProps {
  currentIndex: number;
  totalIndex?: number;
}

interface AuthorInfoNicknameProps {
  nickname?: string;
  color?: ColorName;
}

function AuthorInfoPageLength({
  currentIndex,
  totalIndex,
}: AuthorInfoLengthProps) {
  return (
    <StyledAuthorInfoPageLength>
      <div>
        <span>{currentIndex + 1}</span>/{totalIndex}
      </div>
    </StyledAuthorInfoPageLength>
  );
}

function AuthorInfoNickname({ nickname, color }: AuthorInfoNicknameProps) {
  return (
    <StyledAuthorInfoNickname color={color}>
      <div>From</div>
      <div>{nickname}</div>
    </StyledAuthorInfoNickname>
  );
}

export default function DetailAuthorInfo({
  children,
  hasPadding,
}: {
  children: React.ReactNode;
  hasPadding?: boolean;
}) {
  return <StyledWrapper hasPadding={hasPadding}>{children}</StyledWrapper>;
}

DetailAuthorInfo.Nickname = AuthorInfoNickname;
DetailAuthorInfo.PageLength = AuthorInfoPageLength;

const StyledWrapper = styled.div<{ hasPadding?: boolean }>`
  width: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: ${({ hasPadding }) => (hasPadding ? '0 24px' : 0)};
  position: relative;
  z-index: 50;
  justify-content: center;
`;

const StyledAuthorInfoNickname = styled.div<{ color?: ColorName }>`
  display: flex;
  width: 100%;
  gap: 4px;
  div {
    color: ${({ theme, color }) =>
      color ? theme.colors[color] : theme.colors['gray-900']};
    ${getFontSizeAndWeight('heading3', 'medium')};
  }
  div:nth-of-type(1) {
    margin-top: auto;
  }
  div:nth-of-type(2) {
    padding: 8px 0;
    text-align: right;
    border-bottom: ${({ theme, color }) =>
      `1px dashed ${color ? theme.colors[color] : theme.colors['gray-800']}`};
    flex: 1;
  }
  align-items: center;
`;

const StyledAuthorInfoPageLength = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  div {
    padding: 4px 12px;
    border-radius: 99px;
    background-color: ${({ theme }) => theme.colors.white};
    ${getFontSizeAndWeight('heading4', 'regular')};
    color: ${({ theme }) => theme.colors['gray-500']};
  }
  span {
    display: inline-block;
    color: ${({ theme }) => theme.colors['gray-800']};
    font-weight: 700;
  }
`;
