import MyMessageItem from '@/components/my/message/message-item';
import { StyledList } from '@/components/rollingpaper/list/message-list';
import { useUserMessagesSuspenseQuery } from '@/queries/message';

export default function MyMessageList() {
  const { data } = useUserMessagesSuspenseQuery();

  return (
    <StyledList>
      {data.data?.map((message) => (
        <MyMessageItem message={message} key={message.id} />
      ))}
    </StyledList>
  );
}
