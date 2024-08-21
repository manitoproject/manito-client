import { usePaperMessagesQuery } from '../../../../queries/message';

export default function DetailMessagelength() {
  const { data: messageData } = usePaperMessagesQuery();

  return (
    <span>
      <strong>{messageData?.data?.length}</strong>
      개의 작성물
    </span>
  );
}
