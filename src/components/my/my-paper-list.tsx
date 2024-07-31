import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import { Trash } from '../../assets/svg/icons';
import { useDeletePaper, useUserPaperQuery } from '../../queries/paper';
import { useUserQuery } from '../../queries/users';
import { routes } from '../../router';
import { getFontSizeAndWeight } from '../../styles/mixins';

export default function MyPaperList() {
  const { data: userData } = useUserQuery();
  const { data } = useUserPaperQuery(userData?.data?.id);
  const { mutate } = useDeletePaper();
  const handleButtonClick = (e: React.MouseEvent, id?: number) => {
    e.preventDefault();
    mutate(id);
  };

  return (
    <StyledList>
      {data?.data?.map((item) => (
        <StyledItem key={item.id}>
          <Link to={routes.rolling.detail(item.id)}>
            <span>{item.title}</span>
            <div>
              <span>{dayjs(item.regDateTime).format('YYYY.MM.DD')}</span>
              <button
                type="button"
                onClick={(e) => handleButtonClick(e, item.id)}
              >
                <Trash />
              </button>
            </div>
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

    & > span {
      margin-right: 8px;
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
      ${getFontSizeAndWeight('heading4', 'medium')}
      color: ${({ theme }) => theme.colors['gray-800']};
    }
    div {
      display: flex;
      align-items: center;
      gap: 8px;
      span {
        color: ${({ theme }) => theme.colors['gray-500']};
        ${getFontSizeAndWeight('body1', 'regular')};
      }
      button {
        svg {
          width: 24px;
          height: 24px;
        }
        path {
          fill: ${({ theme }) => theme.colors['gray-700']};
        }
        padding: 4px;
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
        background-color: ${({ theme }) => theme.colors.white};
        border-radius: 4px;
      }
    }
  }
`;
