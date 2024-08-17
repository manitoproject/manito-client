import styled from '@emotion/styled';

import { useUserPaperQuery } from '../../queries/paper';
import { useUserQuery } from '../../queries/users';
import MyPaperItem from './my-paper-item';

export default function MyPaperList() {
  const { data: userData } = useUserQuery();
  const { data } = useUserPaperQuery(userData?.data?.id);

  return (
    <StyledList>
      {data?.data?.map((item) => (
        <MyPaperItem paper={item} key={item.id} />
      ))}
    </StyledList>
  );
}

const StyledList = styled.ul`
  display: flex;
  gap: 8px;
  flex-direction: column;
`;
