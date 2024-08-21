import { useUserMessagesQuery } from '../../../queries/message';
import { StyledList } from '../../rollingpaper/detail/list/list';
import { MyMessageListSkeleton } from '../../skeletons/skeletons';
import MyMessageItem from './item';

export default function MyMessageList() {
  const { data, isLoading } = useUserMessagesQuery();

  if (isLoading) return <MyMessageListSkeleton />;

  return (
    <StyledList>
      {data?.data?.map((message) => (
        <MyMessageItem message={message} key={message.id} />
      ))}
    </StyledList>
  );
}
