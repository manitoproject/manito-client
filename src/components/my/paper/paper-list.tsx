import styled from '@emotion/styled';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import MyPaperItem from '@/components/my/paper/paper-item';
import { paperQueries, userQueries } from '@/lib/query-factory';

interface MyPaperListProps {
  activeCagegory: RouteContentType;
}
const categoryMap: Record<RouteContentType, Category> = {
  rollingpaper: 'ROLLING_PAPER',
  makecake: 'CAKE',
  treasurebox: 'TREASURE',
};

export default function MyPaperList({ activeCagegory }: MyPaperListProps) {
  const { data: user } = useQuery(userQueries.detail());
  const { data: papers } = useSuspenseQuery(paperQueries.user(user?.id));

  const filteredList = papers?.filter(
    (paper) => paper.category === categoryMap[activeCagegory],
  );

  return (
    <StyledList>
      {filteredList?.map((item) => (
        <MyPaperItem
          activeCagegory={activeCagegory}
          paper={item}
          key={item.id}
        />
      ))}
    </StyledList>
  );
}

export const StyledList = styled.ul`
  display: flex;
  gap: 8px;
  flex-direction: column;
`;
