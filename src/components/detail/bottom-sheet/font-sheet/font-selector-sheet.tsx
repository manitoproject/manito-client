import styled from '@emotion/styled';

import { getFontSizeAndWeight } from '../../../../utils/style';

const MENU = ['폰트 선택', '폰트색상선택'];

interface FontContentProps {
  children: React.ReactNode;
  activeMenuIndex: number;
  setActiveMenuIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function FontSelectorSheet({
  children,
  activeMenuIndex,
  setActiveMenuIndex,
}: FontContentProps) {
  return (
    <StyledWrapper>
      <StyledMenuList>
        {MENU.map((menu, i) => (
          <StyledMenuItem
            onClick={() => setActiveMenuIndex(i)}
            key={menu}
            isActive={activeMenuIndex === i}
          >
            {menu}
          </StyledMenuItem>
        ))}
      </StyledMenuList>
      {children}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const StyledMenuList = styled.div`
  display: flex;
  gap: 8px;
`;
const StyledMenuItem = styled.button<{ isActive: boolean }>`
  flex: 1;
  ${getFontSizeAndWeight('heading3', 'regular')};
  padding: 11.5px 0;
  line-height: 20px;
  font-weight: ${({ isActive }) => (isActive ? 700 : 400)};
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.gray[900] : theme.colors.gray[600]};
  border-bottom: ${({ isActive, theme }) =>
    isActive ? `1px solid ${theme.colors.gray[800]}` : 'none'};
`;
