import { routes } from '../router';

export interface HeaderNavigation {
  pathname: () => string;
  title: string;
  isShowLeftBtn: boolean;
  isShowMenuBtn: boolean;
  theme: string;
  bgColor: string;
  textColor: string;
}

const headerNavigation: HeaderNavigation[] = [
  {
    bgColor: '',
    textColor: '',
    theme: '',
    pathname: () => routes.join,
    title: '회원 가입',
    isShowLeftBtn: true,
    isShowMenuBtn: false,
  },
  {
    bgColor: '',
    textColor: '',
    theme: '',
    pathname: () => routes.home,
    title: '메인 페이지',
    isShowLeftBtn: false,
    isShowMenuBtn: true,
  },
  {
    bgColor: '',
    textColor: '',
    theme: '',
    pathname: () => routes.rolling.setup(),
    title: 'Hello Roling',
    isShowLeftBtn: true,
    isShowMenuBtn: false,
  },
  {
    bgColor: '',
    textColor: '',
    theme: '',
    pathname: () => routes.rolling.detail(),
    title: '추억의 롤링페이퍼',
    isShowLeftBtn: true,
    isShowMenuBtn: true,
  },
  {
    bgColor: '',
    textColor: '',
    theme: '',
    pathname: () => '',
    title: '마니또',
    isShowLeftBtn: true,
    isShowMenuBtn: true,
  },
];

export default headerNavigation;
