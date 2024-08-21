import styled from '@emotion/styled';

import { useUserPaperQuery } from '../../../queries/paper';
import { useUserQuery } from '../../../queries/users';
import { MyPaperListSkeleton } from '../../skeletons/skeletons';
import MyPaperItem from './paper-item';

export default function MyPaperList() {
  const { data: userData } = useUserQuery();
  const { data, isLoading } = useUserPaperQuery(userData?.data?.id);

  if (isLoading) return <MyPaperListSkeleton />;

  return (
    <StyledList>
      {data?.data?.map((item) => (
        <MyPaperItem paper={item} key={item.id} />
      ))}
    </StyledList>
  );
}

export const StyledList = styled.ul`
  display: flex;
  gap: 8px;
  flex-direction: column;
`;
