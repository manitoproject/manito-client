import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getFontSizeAndWeight } from '@/styles/mixins';

interface CategoryTabProps {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  activeIndex: number;
}

const contents: { name: CategoryKor }[] = [
  {
    name: '페이퍼',
  },
  {
    name: '케이크',
  },
];

export default function CategoryTab({
  activeIndex,
  setActiveIndex,
}: CategoryTabProps) {
  return (
    <StyledWrapper>
      {contents.map((content, i) => (
        <StyledButton
          onClick={() => setActiveIndex(i)}
          isActive={activeIndex === i}
          key={content.name}
        >
          {content.name}
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
