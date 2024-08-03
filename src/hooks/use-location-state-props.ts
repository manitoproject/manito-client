import { useLocation } from 'react-router-dom';

import { Message } from '../types/message';

type RollingThemeNameType = { rollingThemeName: RollingThemeName };
interface PaperCreation extends RollingThemeNameType {
  emoji: string;
  paperId: number;
  position: number;
}

type NewMessage = Message & RollingThemeNameType;

export default function useLocationState(): NewMessage | PaperCreation {
  const { state } = useLocation();

  const isMessage = (data: NewMessage | null): data is NewMessage => {
    return data?.id !== undefined;
  };

  if (!state) {
    throw new Error();
  }

  if (isMessage(state)) {
    return state;
  }

  return state as PaperCreation;
}
