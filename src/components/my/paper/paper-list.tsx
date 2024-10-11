import styled from '@emotion/styled';

import MyPaperItem from '@/components/my/paper/paper-item';
import { MyPaperListSkeleton } from '@/components/skeletons/skeletons';
import { useUserPaperQuery } from '@/queries/paper';
import { useUserQuery } from '@/queries/users';

interface MyPaperListProps {
  activeCagegory: Category;
}

export default function MyPaperList({ activeCagegory }: MyPaperListProps) {
  const { data: userData } = useUserQuery();
  const { data, isLoading } = useUserPaperQuery(userData?.data?.id);

  const filteredList = data?.data?.filter(
    (paper) => paper.category === activeCagegory,
  );

  if (isLoading) return <MyPaperListSkeleton />;

  return (
    <StyledList>
      {filteredList?.map((item) => (
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
