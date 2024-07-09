const theme = {
  fontSize: {
    heading1: '20px',
    heading2: '18px',
    heading3: '16px',
    body1: '14px',
    body2: '12px',
    body3: '11px',
  },
  fontWeight: {
    bold: 700,
    medium: 500,
    regular: 400,
  },
  fontFamily: {
    SpoqaHanSansNeo: 'SpoqaHanSansNeo',
    AppleSDGothicNeo: 'AppleSDGothicNeo',
  },
  sizes: {
    mobile: '430px',
    padding: '24px',
    header: '54px',
  },
  colors: {
    powderBlue: {
      50: '#F7F8FB',
      100: '#EEF2FB',
      200: '#D7E3FD',
      300: '#CCDAFD',
      400: '#C2D3FF',
      500: '#B6CCFE',
      600: '#ABC3FF',
      700: '#88A8F8',
      800: '#6C94F9',
      900: '#5383FB',
    },
    gray: {
      50: '#F9F9F9',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    white: '#FFFFFF',
    black: '#000000',
    kakao: '#FEE500',
    error: '#F04747',
  },
};

export type ThemeType = typeof theme;
export type Colors = ThemeType['colors'];
export type ColorNumber = keyof Colors['powderBlue'] | keyof Colors['gray'];
export type BackGroundColor =
  | keyof Omit<Colors, 'powderBlue'>
  | `powderBlue-${ColorNumber}`
  | `gray-${ColorNumber}`;

export default theme;
