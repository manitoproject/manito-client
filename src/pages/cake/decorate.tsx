import styled from '@emotion/styled';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Decorations from '@/components/cake/decorations';
import { Button } from '@/components/common/button/buttons';
import {
  CAKE_THEME_STYLES,
  CakeTheme,
  DecorationType,
} from '@/constants/cake-decoration';
import ReactHelmet from '@/helmet';
import useSetHeader from '@/hooks/use-set-header';
import routes from '@/routes';
import { useMessageActions } from '@/stores/message-store';
import { getFontSizeAndWeight } from '@/styles/mixins';

export default function CakeDecorate() {
  const [activeTab, setActiveTab] = useState<DecorationType>('chocolate');
  const [activeDeco, setActiveDeco] = useState('');
  const { setInfo } = useMessageActions();
  const navigate = useNavigate();
  const location = useLocation();
  useSetHeader({ rightBtn: false, title: '장식선택' });
  const handleNextStep = () => {
    navigate(routes.cake.form('create', location.state?.id));
    setInfo({ theme: activeDeco });
  };

  return (
    <StyledWrapper>
      <h2>케이크 장식을 선택해주세요.</h2>
      <ul>
        {CAKE_THEME_STYLES.map((deco) => (
          <StyledList
            deco={deco}
            isActive={deco.labelEng === activeTab}
            key={deco.labelKor}
          >
            <button onClick={() => setActiveTab(deco.labelEng)}>
              {deco.labelKor}
            </button>
          </StyledList>
        ))}
      </ul>
      <Decorations
        activeDeco={activeDeco}
        setActiveDeco={setActiveDeco}
        activeTab={activeTab}
      />
      <StyledButtonWrapper>
        <Button onClick={handleNextStep} disabled={!activeDeco}>
          선택하기
        </Button>
      </StyledButtonWrapper>
      <ReactHelmet title={`장식선택 - 마니또`} />
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
const StyledList = styled.li<{ isActive: boolean; deco: CakeTheme }>`
  width: 100%;
  button {
    text-align: center;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding: 16px;
    width: 100%;
    background-color: ${({ theme, isActive, deco }) =>
      isActive ? theme.colors[deco.bgColor] : theme.colors.white};
    color: ${({ theme, isActive, deco }) =>
      isActive ? theme.colors[deco.fontColor] : theme.colors['gray-500']};
    ${getFontSizeAndWeight('heading4', 'medium')}
  }
`;

const StyledButtonWrapper = styled.div`
  margin-top: auto;
`;
