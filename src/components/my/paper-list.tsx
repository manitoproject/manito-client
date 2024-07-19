import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import { Paper } from '../../types/paper';
import { getFontSizeAndWeight } from '../../utils/style';

interface PaperListProps {
  list?: Paper[];
}

export default function PaperList({ list }: PaperListProps) {
  return (
    <StyledList>
      {list?.map((paper) => (
        <StyledItem key={paper.id}>
          <Link to="#">
            <span>{paper.title}</span>
            <span>{dayjs(paper.regDateTime).format('YYYY.MM.DD')}</span>
          </Link>
        </StyledItem>
      ))}
    </StyledList>
  );
}

const StyledList = styled.ul`
  display: flex;
  gap: 8px;
  flex-direction: column;
`;

const StyledItem = styled.li`
  a {
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors['powderBlue-50']};
    border: ${({ theme }) => `1px solid ${theme.colors['powderBlue-100']}`};
    align-items: center;
    display: flex;
    padding: 18px 16px;

    span:nth-of-type(1) {
      flex: 1;
      ${getFontSizeAndWeight('heading4', 'medium')}
      color: ${({ theme }) => theme.colors['gray-800']};
    }
    span:nth-of-type(2) {
      color: ${({ theme }) => theme.colors['gray-500']};
      ${getFontSizeAndWeight('body1', 'regular')};
    }
  }
`;
