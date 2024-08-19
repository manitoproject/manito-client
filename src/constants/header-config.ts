import routes from './routes';

export interface HeaderConfig {
  pathname: () => string;
  title: string;
  isShowLeftBtn: boolean;
  isShowMenuBtn: boolean;
}

const headerMap: HeaderConfig[] = [
  {
    pathname: () => routes.signup,
    title: '회원 가입',
    isShowLeftBtn: true,
    isShowMenuBtn: false,
  },
  {
    pathname: () => routes.home,
    title: '메인 페이지',
    isShowLeftBtn: true,
    isShowMenuBtn: true,
  },
  {
    pathname: () => routes.setupIntro('rolling'),
    title: 'Rollring paper',
    isShowLeftBtn: true,
    isShowMenuBtn: false,
  },
  {
    pathname: () => routes.rollingpaper.setup(),
    title: '롤링페이퍼 테마선택',
    isShowLeftBtn: true,
    isShowMenuBtn: false,
  },
  // {
  //   pathname: () => routes.rollingpaper.edit(),
  //   title: '편지 선택',
  //   isShowLeftBtn: true,
  //   isShowMenuBtn: false,
  // },
  // {
  //   pathname: () => routes.rollingpaper.edit(),
  //   title: '편지 작성',
  //   isShowLeftBtn: true,
  //   isShowMenuBtn: false,
  // },
  // {
  //   pathname: () => routes.rollingpaper.edit(),
  //   title: '수정하기',
  //   isShowLeftBtn: true,
  //   isShowMenuBtn: false,
  // },
  {
    pathname: () => routes.my.setting(),
    title: '설정',
    isShowLeftBtn: true,
    isShowMenuBtn: true,
  },
  {
    pathname: () => routes.my.contact(),
    title: '문의하기',
    isShowLeftBtn: true,
    isShowMenuBtn: false,
  },
  {
    pathname: () => routes.my.rename(),
    title: '프로필 수정',
    isShowLeftBtn: true,
    isShowMenuBtn: false,
  },
  {
    pathname: () => routes.my.default,
    title: '마이 페이지',
    isShowLeftBtn: false,
    isShowMenuBtn: true,
  },
];

export default headerMap;
