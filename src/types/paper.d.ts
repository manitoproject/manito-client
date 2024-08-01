interface PaperCreateType {
  category: 'ROLLING_PAPER';
  title: string;
  theme: ThemeName;
}

type PaperType = '페이퍼' | '보물' | '케이크';

interface Paper {
  id: number;
  category: keyof PaperCreateType['category'];
  title: string;
  theme: ThemeName;
  regDateTime: string;
  modDateTime?: string;
}

interface PaperDetail extends Paper {
  userId: number;
}
