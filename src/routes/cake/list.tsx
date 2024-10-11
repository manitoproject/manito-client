import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ChocolateBgOriginal,
  StrawberryBgOriginal,
  VanillaBgOriginal,
} from '@/assets/imgs';
import { EditSquare } from '@/assets/svg/icons';
import DetailHeader from '@/components/rollingpaper/list/header/detail-header';
import { useSetHeader } from '@/hooks';
import { usePaperDetailQuery } from '@/queries/paper';
import routes from '@/routes';
import {
  StyledBackdrop,
  StyledListWrapper,
  StyledRollingList,
} from '@/routes/rollingpaper/list.style';

const THEME_PALETTES: Array<{ btnColor: string; bgUrl: string }> = [
  { btnColor: '#F9BBC8', bgUrl: StrawberryBgOriginal },
  { btnColor: '#74342A', bgUrl: ChocolateBgOriginal },
  { btnColor: '#FE7D3F', bgUrl: VanillaBgOriginal },
];

export default function CakeList() {
  const [bgIndex, setBgIndex] = useState(0);
  const navigate = useNavigate();
  const { data } = usePaperDetailQuery();
  const paper = data?.data;
  useSetHeader({ title: paper?.title, bg: 'pink-300', color: 'white' });

  return (
    <StyledRollingList>
      <StyledListWrapper>
        <DetailHeader paperId={paper?.id} />
      </StyledListWrapper>
      <StyledBackdrop bg={THEME_PALETTES[bgIndex].bgUrl} />
      <StyledWriteButton
        onClick={() => navigate(routes.cake.editor(bgIndex))}
        bg={THEME_PALETTES[bgIndex].btnColor}
      >
        <EditSquare width={40} height={40} fill="#fff" />
      </StyledWriteButton>
    </StyledRollingList>
  );
}

const StyledWriteButton = styled.button<{ bg: string }>`
  z-index: 50;
  padding: 10px;
  border-radius: 8px;

  background-color: ${({ bg }) => bg};
  width: fit-content;
  position: absolute;
  right: 0;
  bottom: 0;
`;
