import { useSuspenseQuery } from '@tanstack/react-query';

import MyMessageItem from '@/components/my/message/message-item';
import { StyledList } from '@/components/rollingpaper/list/message-list';
import { messageQueries } from '@/lib/query-factory';

interface MyMessageListProps {
  activeCagegory: RouteContentType;
}

export default function MyMessageList({ activeCagegory }: MyMessageListProps) {
  const { data } = useSuspenseQuery(messageQueries.user());
  const filteredList = data?.filter((paper) => {
    if (activeCagegory === 'treasurebox') {
      return paper.theme.includes('Treasure');
    } else if (activeCagegory === 'rollingpaper') {
      return (
        paper.theme.includes('Space') ||
        paper.theme.includes('Nature') ||
        paper.theme.includes('Animal')
      );
    } else {
      return (
        paper.theme.includes('White') ||
        paper.theme.includes('Vanilla') ||
        paper.theme.includes('Chocolate') ||
        paper.theme.includes('Strawberry')
      );
    }
  });
  return (
    <StyledList>
      {filteredList?.map((message) => (
        <MyMessageItem
          activeCagegory={activeCagegory}
          message={message}
          key={message.id}
        />
      ))}
    </StyledList>
  );
}
