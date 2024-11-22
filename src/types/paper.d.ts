interface PaperCreateType {
  category: Category;
  title: string;
  theme: RollingpaperThemeName;
}
type RouteContentType = 'rollingpaper' | 'makecake' | 'treasurebox';
type RollingpaperThemeName = 'space' | 'nature' | 'animal';
type Category = 'ROLLING_PAPER' | 'CAKE' | 'TREASURE';
type CategoryLowerCase = 'rollingpaper' | 'cake' | 'treasure';

interface Theme {
  label: '우주' | '자연' | '멍냥';
  id: RollingpaperThemeName;
  img: string;
}

interface Paper {
  id: number;
  category: Category;
  title: string;
  theme: RollingpaperThemeName;
  regDateTime: string;
  modDateTime?: string;
}

interface PaperDetail extends Paper {
  userId: number;
}
