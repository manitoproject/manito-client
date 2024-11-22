import styled from '@emotion/styled';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@/components/common/buttons/buttons';
import DecorationList from '@/components/makecake/decoration-list';
import DecorationMenu from '@/components/makecake/decoration-menu';
import ReactHelmet from '@/helmet';
import useSetHeader from '@/hooks/use-set-header';
import { DecorationType } from '@/lib/cake-decoration';
import routes from '@/routes';
import { getFontSizeAndWeight } from '@/styles/mixins';

export default function CakeDecorate() {
  const [activeTab, setActiveTab] = useState<DecorationType>('chocolate');
  const [activeDeco, setActiveDeco] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const handleNextStep = () => {
    navigate(routes.makecake.messageCreate(location.state?.id), {
      state: { theme: activeDeco },
    });
  };

  useSetHeader({ rightBtn: false, title: '장식선택' });

  return (
    <StyledWrapper>
      <h2>케이크 장식을 선택해주세요.</h2>
      <DecorationMenu
        activeTab={activeTab}
        onChangeActiveTab={(tab: DecorationType) => setActiveTab(tab)}
      />
      <DecorationList
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

const StyledButtonWrapper = styled.div`
  margin-top: auto;
`;
