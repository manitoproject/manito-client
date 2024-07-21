import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import emojis from '../constants/emojis';
import themeList, { ThemeKey } from '../constants/theme-list';

export default function useValidationQueryString() {
  const [searchParams] = useSearchParams();
  const theme = searchParams.get('theme');
  const emoji = searchParams.get('emoji');
  const paperId = searchParams.get('paperId');

  useEffect(() => {
    const isVlidateThemeValue = (theme: string | null): theme is ThemeKey =>
      themeList.some((item) => item.themeEng === theme);
    const isValidateEmojiValue = (theme: ThemeKey) =>
      emoji && emojis[theme].length >= +emoji;
    const isValidatePaperId = () => !!paperId?.length;

    if (isVlidateThemeValue(theme)) {
      const isValid = isValidateEmojiValue(theme) && isValidatePaperId();
      if (!isValid) throw new Error();
    } else {
      throw new Error();
    }
  }, [emoji, paperId, theme]);

  return { theme, emojiIndex: emoji, paperId } as {
    theme: ThemeKey;
    emojiIndex: string;
    paperId: string;
  };
}
