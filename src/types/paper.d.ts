interface PaperCreateType {
  category: 'ROLLING_PAPER';
  title: string;
  theme: RollingThemeName;
}

type RollingThemeName = 'space' | 'nature' | 'animal';

interface Theme {
  themeKor: '우주' | '자연' | '멍냥';
  themeEng: RollingThemeName;
  img: string;
}

type PaperType = '페이퍼' | '보물' | '케이크';

interface Paper {
  id: number;
  category: keyof PaperCreateType['category'];
  title: string;
  theme: RollingThemeName;
  regDateTime: string;
  modDateTime?: string;
}

interface PaperDetail extends Paper {
  userId: number;
}
