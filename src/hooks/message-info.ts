import { useLocation, useParams, useSearchParams } from 'react-router-dom';

import { Message } from '@/types/message';

interface MessageInfo extends Pick<Message<unknown>, 'paperId' | 'position'> {
  paperTheme: RollingThemeName;
  type: 'edit' | 'create';
  activeTab?: 'font' | 'emoji';
  pathname: string;
}

export default function useMessageInfo():
  | MessageInfo
  | (MessageInfo & Message<unknown>) {
  const { state, pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const { id, type } = useParams();
  const activeTab = searchParams.get('activeTab');

  if (!state || !id) throw new Error();
  return { ...state, paperId: +id, type, activeTab, pathname };
}
