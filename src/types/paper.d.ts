interface PaperCreateType {
  category: 'ROLLING_PAPER';
  title: string;
  theme: ThemeKey;
}

type PaperType = '페이퍼' | '보물' | '케이크';

interface Paper {
  id: number;
  category: keyof PaperCreateType['category'];
  title: string;
  theme: ThemeKey;
  regDateTime: string;
  modDateTime?: string;
}

interface PaperDetail extends Paper {
  userId: number;
}
