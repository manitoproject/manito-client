import styled from '@emotion/styled';
import { useState } from 'react';

import { useSetHeader } from '@/hooks';
import { getFontSizeAndWeight } from '@/styles/mixins';
import theme from '@/styles/theme';

const DECORATIONS: { text: string; fontColor: string; bgColor: string }[] = [
  {
    text: '초코',
    fontColor: theme.colors['chocolate-300'],
    bgColor: theme.colors['chocolate-100'],
  },
  {
    text: '바닐라',
    fontColor: theme.colors['vanilla-300'],
    bgColor: theme.colors['vanilla-100'],
  },
  {
    text: '딸기',
    fontColor: theme.colors['pink-300'],
    bgColor: theme.colors['pink-100'],
  },
  {
    text: '화이트',
    fontColor: theme.colors['gray-800'],
    bgColor: theme.colors['gray-100'],
  },
];

export default function CakeEditor() {
  const [activeTab, setActiveTab] = useState(0);
  useSetHeader({ rightBtn: false, title: '장식선택' });
  return (
    <StyledWrapper>
      <h2>케이크 장식을 선택해주세요.</h2>
      <ul>
        {DECORATIONS.map((deco, i) => (
          <StyledList index={i} isActive={i === activeTab} key={deco.text}>
            <button onClick={() => setActiveTab(i)}>{deco.text}</button>
          </StyledList>
        ))}
      </ul>
      <div>asd</div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  h2 {
    ${getFontSizeAndWeight('heading1', 'bold')}
  }
  ul {
    display: flex;
    width: 100%;
  }
`;
const StyledList = styled.li<{ isActive: boolean; index: number }>`
  width: 100%;
  button {
    text-align: center;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding: 16px;
    background-color: red;
    width: 100%;
    background-color: ${({ theme, isActive, index }) =>
      isActive ? DECORATIONS[index].bgColor : theme.colors.white};
    color: ${({ theme, isActive, index }) =>
      isActive ? DECORATIONS[index].fontColor : theme.colors['gray-500']};
    ${getFontSizeAndWeight('heading4', 'medium')}
  }
`;
