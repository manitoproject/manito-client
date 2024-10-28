import MyMessageItem from '@/components/my/message/message-item';
import { StyledList } from '@/components/rollingpaper/list/message-list';
import { useUserMessagesSuspenseQuery } from '@/queries/message';

interface MyMessageListProps {
  activeCagegory: CategoryLowerCase;
}

export default function MyMessageList({ activeCagegory }: MyMessageListProps) {
  const { data } = useUserMessagesSuspenseQuery();
  const filteredList = data?.data?.filter((paper) => {
    if (activeCagegory === 'cake') {
      return (
        paper.theme.includes('White') ||
        paper.theme.includes('Vanilla') ||
        paper.theme.includes('Chocolate') ||
        paper.theme.includes('Strawberry')
      );
    }
    return (
      paper.theme.includes('Space') ||
      paper.theme.includes('Nature') ||
      paper.theme.includes('Animal')
    );
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
