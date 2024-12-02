import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { TreasureStartBg } from '@/assets/imgs/index';
import { EditSquare } from '@/assets/svg/icons';
import ListHeader from '@/components/list/header';
import TreasureBoxTutorial from '@/components/treasurebox/tutorial';
import ReactHelmet from '@/helmet';
import useSetHeader from '@/hooks/use-set-header';
import { messageQueries, paperQueries, userQueries } from '@/lib/query-factory';
import {
  StyledBackdrop,
  StyledListWrapper,
} from '@/pages/rollingpaper/list.style';
import routes from '@/routes';
import { useLoginModalActions } from '@/stores/login-modal-store';
import { getFontSizeAndWeight } from '@/styles/mixins';
import { StyledWriteButton } from '@/styles/styled';
import theme from '@/styles/theme';

export default function TreasureBoxList() {
  const params = useParams();
  const navigate = useNavigate();
  const [isTutorialVisible, setIsTutorialVisible] = useState(true);
  const { data: paper } = useQuery(paperQueries.detail(Number(params.id)));
  const { data: messages } = useQuery(messageQueries.paper(Number(params.id)));
  const { data: user } = useQuery(userQueries.detail());
  const loginModal = useLoginModalActions();

  useSetHeader({
    title: paper?.title,
    bg: 'treasure-teal-700',
    color: 'white',
    font: 'Cafe24Ohsquare',
    rightBtn: !isTutorialVisible,
  });

  const handleWrite = () => {
    if (!user) {
      loginModal.toggleOpen(true);
    } else {
      navigate(routes.treasurebox.messageCreate(paper?.id));
    }
  };

  return (
    <StyledListWrapper>
      {isTutorialVisible ? (
        <TreasureBoxTutorial onNextPage={() => setIsTutorialVisible(false)} />
      ) : (
        <>
          <ListHeader messageLength={messages?.length} content="treasurebox">
            <StyledMessageTotal>
              <span>{messages?.length}</span>
              개의 보물이 도착했어요.
            </StyledMessageTotal>
          </ListHeader>
          <StyledWriteButton
            onClick={handleWrite}
            bgColor={theme.colors['treasure-teal-700']}
          >
            <EditSquare width={40} height={40} fill="#fff" />
          </StyledWriteButton>
        </>
      )}
      <StyledBackdrop bg={TreasureStartBg} />
      <ReactHelmet title={`${paper?.title} - 마니또`} />
    </StyledListWrapper>
  );
}

const StyledMessageTotal = styled.p`
  span {
    ${getFontSizeAndWeight('heading2', 'regular')};
  }
  ${getFontSizeAndWeight('heading3', 'bold')};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: ${({ theme }) => theme.fontFamily.Cafe24Ohsquare};
  color: ${({ theme }) => theme.colors.white};
`;
