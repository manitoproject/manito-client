import styled from '@emotion/styled';
import { motion } from 'framer-motion';

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
          {activeTab === content.id && <StyledMotion layoutId="bubble" />}
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

const StyledMotion = styled(motion.span)`
  position: absolute;
  width: 100%;
  z-index: 10;
  inset: 0;
  border-radius: 4px;
  mix-blend-mode: color;
  background-color: ${({ theme }) => theme.colors['powderBlue-900']};
  color: ${({ theme }) => theme.colors.white};
`;

const StyledButton = styled.button<{ isActive: boolean }>`
  border-radius: 4px;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  z-index: 11;
  ${getFontSizeAndWeight('heading4', 'regular')}
  padding: 12px 16px;
  flex: 1;
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.white : theme.colors['gray-500']};
`;
