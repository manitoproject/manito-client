import { usePaperMessagesQuery } from '@/queries/message';

export default function DetailMessagelength() {
  const { data: messages } = usePaperMessagesQuery();

  return (
    <span>
      <strong>{messages?.length}</strong>
      개의 작성물
    </span>
  );
}
