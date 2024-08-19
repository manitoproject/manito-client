import { useLocation, useParams } from 'react-router-dom';

import { Message } from '../types/message';

interface MessageInfo extends Pick<Message<unknown>, 'paperId' | 'position'> {
  paperTheme: RollingThemeName;
  type: 'edit' | 'create';
}

export default function useMessageInfo():
  | MessageInfo
  | (MessageInfo & Message<unknown>) {
  const { state } = useLocation();
  // const [searchParams] = useSearchParams();
  const { id, type } = useParams();
  // const type = searchParams.get('type');
  // if (!type || !state || !id) throw new Error();
  if (!state || !id || !type) throw new Error();

  return { ...state, paperId: +id, type };
}
