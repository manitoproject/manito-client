import { useState } from 'react';

import { ColorName, FontNameWithoutAppleFont } from '@/styles/theme';
import { Message } from '@/types/message';

export interface MessageForm {
  emoji: string;
  font: FontNameWithoutAppleFont;
  fontColor: ColorName;
  content: string;
}

export default function useMessageForm(
  currentMessage?: Partial<
    Pick<Message<UserIdAndNickname>, 'content' | 'theme' | 'font' | 'fontColor'>
  >,
) {
  const [form, setForm] = useState<MessageForm>({
    content: currentMessage?.content ?? '',
    emoji: currentMessage?.theme ?? '',
    font: currentMessage?.font ?? 'Cafe24Ssurround',
    fontColor: currentMessage?.fontColor ?? 'white',
  });
  const handleChangeForm = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    const { value, name } = e.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return { form, handleChangeForm };
}
