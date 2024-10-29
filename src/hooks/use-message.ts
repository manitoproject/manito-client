import { useCallback, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { usePaperMessagesQuery } from '@/queries/message';

export default function useMessage() {
  const { id } = useParams();
  const location = useLocation();
  const { data: messageData } = usePaperMessagesQuery();
  const myMessage = useMemo(
    () => messageData?.find((data) => data.paperId === Number(id)),
    [id, messageData],
  );
  const [message, setMessage] = useState({
    content: myMessage?.content ?? '',
    font: myMessage?.font ?? 'Cafe24Ssurround',
    color: myMessage?.fontColor ?? 'white',
    emoji: myMessage?.theme ?? '',
    position: location.state.position,
    bg: location.state.bg,
  });

  const handleChangeMessage = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.MouseEvent<HTMLButtonElement>,
    ) => {
      const { name, value } = e.currentTarget;
      setMessage((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  return { message, handleChangeMessage };
}
