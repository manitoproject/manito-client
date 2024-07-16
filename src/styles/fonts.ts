import { css } from '@emotion/react';

import {
  AppleSDGothicNeoSB,
  Cafe24Simplehae,
  Cafe24Ssurround,
  Galmuri11Bold,
  NanumPen,
  PyeongChangPeaceBold,
  SpoqaHanSansNeoBold,
  SpoqaHanSansNeoMedium,
  SpoqaHanSansNeoReaular,
} from '../assets/fonts';
import theme from './theme';

const fonts = css`
  @font-face {
    font-family: ${theme.fontFamily.SpoqaHanSansNeo};
    font-weight: 700;
    src: local('SpoqaHanSansNeo Bold'),
      url(${SpoqaHanSansNeoBold}) format('woff2');
  }
  @font-face {
    font-family: ${theme.fontFamily.SpoqaHanSansNeo};
    font-weight: 500;
    src: local('SpoqaHanSansNeo Medium'),
      url(${SpoqaHanSansNeoMedium}) format('woff2');
  }
  @font-face {
    font-family: ${theme.fontFamily.SpoqaHanSansNeo};
    font-weight: 400;
    src: local('SpoqaHanSansNeo Regular'),
      url(${SpoqaHanSansNeoReaular}) format('woff2');
  }
  @font-face {
    font-family: ${theme.fontFamily.AppleSDGothicNeo};
    font-weight: 600;
    src: local('Apple SD Gothic Neo Semi Bold'),
      url(${AppleSDGothicNeoSB}) format('woff2');
  }
  @font-face {
    font-family: ${theme.fontFamily.Cafe24Simplehae};
    font-weight: 400;
    src: local('Cafe24Simplehae'), url(${Cafe24Simplehae}) format('woff2');
  }
  @font-face {
    font-family: ${theme.fontFamily.Cafe24Ssurround};
    font-weight: 700;
    src: local('Cafe24Ssurround'), url(${Cafe24Ssurround}) format('woff2');
  }
  @font-face {
    font-family: ${theme.fontFamily.Galmuri11};
    font-weight: 700;
    src: local('Galmuri11'), url(${Galmuri11Bold}) format('woff2');
  }
  @font-face {
    font-family: ${theme.fontFamily.NanumPen};
    font-weight: 400;
    src: local('Nanum Pen Script Regular'), url(${NanumPen}) format('woff2');
  }
  @font-face {
    font-family: ${theme.fontFamily.PyeongChangPeace};
    font-weight: 700;
    src: local('PyeongChangPeace Bold'),
      url(${PyeongChangPeaceBold}) format('woff2');
  }
`;

export default fonts;
