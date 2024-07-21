import styled from '@emotion/styled';

import { Clip } from '../../assets/svg/icons';
import { usePaperMessagesQuery } from '../../queries/message';
import { getFontSizeAndWeight } from '../../utils/style';

interface DetailHeaderProps {
  paperId?: number;
}

export default function DetailHeader({ paperId }: DetailHeaderProps) {
  const { data } = usePaperMessagesQuery(paperId);
  return (
    <StyledRollingHeader>
      <span>
        <strong>{data?.data?.length}</strong>개의 작성물
      </span>
      <button>
        <Clip />
      </button>
    </StyledRollingHeader>
  );
}

const StyledRollingHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    color: ${(props) => props.theme.colors['gray-800']};
    ${getFontSizeAndWeight('heading3', 'regular')};
    strong {
      font-weight: 700;
      color: ${(props) => props.theme.colors['gray-900']};
    }
  }
  button {
    padding: 6px;
    border-radius: 4px;
    background-color: ${(props) => props.theme.colors['gray-100']};
  }
`;
