import styled from '@emotion/styled';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import MyPaperItem from '@/components/my/paper/paper-item';
import { paperQueries, userQueries } from '@/lib/query-factory';

interface MyPaperListProps {
  activeCagegory: Category;
}

export default function MyPaperList({ activeCagegory }: MyPaperListProps) {
  const { data: user } = useQuery(userQueries.detail());
  const { data: papers } = useSuspenseQuery(paperQueries.user(user?.id));

  const filteredList = papers?.filter(
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
