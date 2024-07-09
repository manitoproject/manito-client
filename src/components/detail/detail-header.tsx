import styled from '@emotion/styled';

import { Clip } from '../../assets/svg';
import { getFontSizeAndWeight } from '../../styles/utils';

export default function DetailHeader() {
  return (
    <StyledRollingHeader>
      <span>
        <strong>3</strong>개의 작성물
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
    color: ${(props) => props.theme.colors.gray[800]};
    ${getFontSizeAndWeight('heading3', 'regular')};
    strong {
      font-weight: 700;
      color: ${(props) => props.theme.colors.gray[900]};
    }
  }
  button {
    padding: 6px;
    border-radius: 4px;
    background-color: ${(props) => props.theme.colors.gray[100]};
  }
`;
