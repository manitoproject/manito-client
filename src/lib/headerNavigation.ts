import { routes } from '../router';

const headerNavigation = [
  {
    pathname: () => routes.join,
    title: '회원 가입',
    isShowLeftBtn: true,
    isShowMenuBtn: false,
  },
  {
    pathname: () => routes.home,
    title: '메인 페이지',
    isShowLeftBtn: false,
    isShowMenuBtn: true,
  },
  {
    pathname: () => routes.rolling.setup(),
    title: 'Hello Roling',
    isShowLeftBtn: true,
    isShowMenuBtn: false,
  },
  {
    pathname: () => '',
    title: '마니또',
    isShowLeftBtn: true,
    isShowMenuBtn: false,
  },
];

export default headerNavigation;
