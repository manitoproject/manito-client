import styled from '@emotion/styled';

import MyPaperItem from '@/components/my/paper/paper-item';
import { useUserPaperSuspenseQuery } from '@/queries/paper';
import { useUserQuery } from '@/queries/users';

interface MyPaperListProps {
  activeCagegory: Category;
}

export default function MyPaperList({ activeCagegory }: MyPaperListProps) {
  const { data: userData } = useUserQuery();
  const { data } = useUserPaperSuspenseQuery(userData?.data?.id);

  const filteredList = data?.filter(
    (paper) => paper.category === activeCagegory,
  );

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
