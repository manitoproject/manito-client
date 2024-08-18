import { useUserMessagesQuery } from '../../queries/message';
import { StyledList } from '../rolling-detail/message-list';
import MyMessageItem from './my-message-item';

export default function MyMessageList() {
  const { data } = useUserMessagesQuery();

  return (
    <StyledList>
      {data?.data?.map((message) => (
        <MyMessageItem message={message} key={message.id} />
      ))}
    </StyledList>
  );
}
