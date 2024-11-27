import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { Document, Edit } from '@/assets/svg/icons';
import { getFontSizeAndWeight } from '@/styles/mixins';

const tab = [
  {
    name: '내 컨텐츠',
    svg: Document,
  },
  {
    name: '내 작성물',
    svg: Edit,
  },
];

interface MyMenuActivityTabProps {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  activeIndex: number;
  resetCategoryTab: () => void;
}

export default function MyMenuActivityTab({
  activeIndex,
  setActiveIndex,
  resetCategoryTab,
}: MyMenuActivityTabProps) {
  return (
    <StyledMenuWrapper>
      {tab.map((tab, i) => (
        <StyledMenu
          onClick={() => {
            setActiveIndex(i);
            resetCategoryTab();
          }}
          isActive={i === activeIndex}
          key={tab.name}
        >
          <tab.svg />
          <span>{tab.name}</span>
          {activeIndex === i && <StyledMotion layoutId="underline" />}
        </StyledMenu>
      ))}
    </StyledMenuWrapper>
  );
}

const StyledMotion = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: ${({ theme }) => theme.colors['gray-800']};
`;

const StyledMenuWrapper = styled.div`
  display: flex;
  gap: 8px;
  position: relative;
`;
const StyledMenu = styled.button<{ isActive: boolean }>`
  ${({ isActive, theme }) => css`
    ${getFontSizeAndWeight('heading4', isActive ? 'bold' : 'medium')}
    display: flex;
    padding: 16px 0;
    gap: 4px;
    position: relative;
    justify-content: center;
    align-items: center;
    flex: 1;
    /* &::after {
      display: ${isActive ? 'auto' : 'none'};
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      bottom: 0;
      border-bottom: 1px solid ${theme.colors['gray-800']};
    } */
    svg {
      path {
        stroke: ${isActive
          ? theme.colors['gray-800']
          : theme.colors['gray-500']};
      }
      width: 20px;
      height: 20px;
    }
    span {
      color: ${isActive ? theme.colors['gray-900'] : theme.colors['gray-600']};
    }
  `}
`;
