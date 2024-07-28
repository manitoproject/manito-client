import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import emojis from '../constants/emojis';
import { maxMessageLength } from '../constants/regexPatterns';
import themeList, { ThemeKey } from '../constants/theme-list';

export default function useValidationQueryString() {
  const [searchParams] = useSearchParams();
  const theme = searchParams.get('theme');
  const emoji = searchParams.get('emoji');
  const paperId = searchParams.get('paperId');
  const position = searchParams.get('position');

  useEffect(() => {
    const isVlidateThemeValue = (theme: string | null): theme is ThemeKey =>
      themeList.some((item) => item.themeEng === theme);
    const isValidateEmojiValue = (theme: ThemeKey) =>
      emoji && emojis[theme].length >= +emoji;
    const isValidatePaperIdAndPosition = (nums: Array<string | null>) => {
      return nums.every((num) => {
        const newNum = Number(num);
        return newNum >= 0 && newNum <= maxMessageLength;
      });
    };

    if (isVlidateThemeValue(theme)) {
      const isValid =
        isValidateEmojiValue(theme) &&
        isValidatePaperIdAndPosition([paperId, position]);
      if (!isValid) throw new Error();
    } else {
      throw new Error();
    }
  }, [emoji, paperId, position, theme]);

  return { theme, emojiIndex: emoji, paperId, position } as {
    theme: ThemeKey;
    emojiIndex: string;
    paperId: string;
    position: string;
  };
}
