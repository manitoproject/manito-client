import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import emojis from '../constants/emojis';
import { maxMessageLength } from '../constants/regex-patterns';
import THEME_LIST, { ThemeName } from '../constants/theme-list';
import { Message } from '../types/message';

export default function useValidationQueryString() {
  const { state } = useLocation<Message>();
  const [searchParams] = useSearchParams();
  const theme = searchParams.get('theme');
  const emoji = searchParams.get('emoji');
  const paperId = searchParams.get('paperId');
  const position = searchParams.get('position');






  if (state)






  // useEffect(() => {
  //   const isVlidateThemeValue = (theme: string | null): theme is ThemeName =>
  //     THEME_LIST.some((item) => item.themeEng === theme);
  //   const isValidateEmojiValue = (theme: ThemeName) =>
  //     emoji && emojis[theme].length >= +emoji;
  //   const isValidatePaperIdAndPosition = (nums: Array<string | null>) => {
  //     return nums.every((num) => {
  //       const newNum = Number(num);
  //       return newNum >= 0 && newNum <= maxMessageLength;
  //     });
  //   };

  //   if (isVlidateThemeValue(theme)) {
  //     const isValid =
  //       isValidateEmojiValue(theme) &&
  //       isValidatePaperIdAndPosition([paperId, position]);
  //     if (!isValid) throw new Error();
  //   } else {
  //     throw new Error();
  //   }
  // }, [emoji, paperId, position, theme]);

  // return { theme, emojiIndex: emoji, paperId, position } as {
  //   theme: ThemeName;
  //   emojiIndex: string;
  //   paperId: string;
  //   position: string;
  // };
}
