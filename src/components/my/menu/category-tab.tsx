import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getFontSizeAndWeight } from '@/styles/mixins';

interface MyMenuCategoryTabProps {
  onChangeActiveTab: (tab: RouteContentType) => void;
  activeTab: RouteContentType;
}

const contents: { id: RouteContentType; label: string }[] = [
  { id: 'rollingpaper', label: '페이퍼' },
  { id: 'makecake', label: '케이크' },
  { id: 'treasurebox', label: '보물' },
];

export default function MyMenuCategoryTab({
  activeTab,
  onChangeActiveTab,
}: MyMenuCategoryTabProps) {
  return (
    <StyledWrapper>
      {contents.map((content) => (
        <StyledButton
          onClick={() => onChangeActiveTab(content.id)}
          isActive={activeTab === content.id}
          key={content.id}
        >
          {content.label}
        </StyledButton>
      ))}
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
  padding: 8px 16px;
  display: flex;
  gap: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors['gray-100']};
`;

const StyledButton = styled.button<{ isActive: boolean }>`
  border-radius: 4px;
  ${getFontSizeAndWeight('heading4', 'regular')}
  padding: 12px 16px;
  flex: 1;
  ${({ theme, isActive }) => css`
    background-color: ${isActive
      ? theme.colors['powderBlue-900']
      : theme.colors['gray-100']};
    color: ${isActive ? theme.colors.white : theme.colors['gray-500']};
  `}
`;
