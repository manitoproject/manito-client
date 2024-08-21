import { useUserMessagesSuspenseQuery } from '../../../queries/message';
import { StyledList } from '../../rollingpaper/list/message-list';
import MyMessageItem from './message-item';

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
